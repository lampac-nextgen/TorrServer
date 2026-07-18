import { Button } from '@heroui/react'
import { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import type { PlayableFile } from 'shared/api/types'

import FilesDataGrid from './FilesDataGrid'

interface FileBrowserProps {
  playableFileList: PlayableFile[]
  viewedFileList?: number[]
  selectedSeason?: number
  seasonAmount?: number[] | null
  hash: string
}

type DirNode = { id: string; label: string; children: Map<string, DirNode>; files: PlayableFile[] }

function buildTree(files: PlayableFile[]): DirNode {
  const root: DirNode = { id: 'root', label: '/', children: new Map(), files: [] }
  for (const file of files) {
    const parts = file.path.replace(/\\/g, '/').split('/').filter(Boolean)
    if (parts.length <= 1) {
      root.files.push(file)
      continue
    }
    let node = root
    for (let i = 0; i < parts.length - 1; i++) {
      const part = parts[i]
      const id = `${node.id}/${part}`
      if (!node.children.has(part)) {
        node.children.set(part, { id, label: part, children: new Map(), files: [] })
      }
      node = node.children.get(part)!
    }
    node.files.push(file)
  }
  return root
}

function collectFiles(node: DirNode): PlayableFile[] {
  const out = [...node.files]
  for (const child of node.children.values()) out.push(...collectFiles(child))
  return out
}

function FolderTree({
  node,
  selectedFolder,
  onSelect,
  depth = 0,
}: {
  node: DirNode
  selectedFolder: string
  onSelect: (id: string) => void
  depth?: number
}) {
  return (
    <>
      {[...node.children.values()].map(child => (
        <div key={child.id}>
          <Button
            variant={selectedFolder === child.id ? 'primary' : 'ghost'}
            size='sm'
            className='mb-1 w-full justify-start'
            style={{ paddingLeft: `${8 + depth * 12}px` }}
            onPress={() => onSelect(child.id)}
          >
            {child.label}
          </Button>
          <FolderTree node={child} selectedFolder={selectedFolder} onSelect={onSelect} depth={depth + 1} />
        </div>
      ))}
    </>
  )
}

/** Multi-file browser: folder tree + file list. */
export default function FileBrowser({
  playableFileList,
  viewedFileList,
  selectedSeason,
  seasonAmount,
  hash,
}: FileBrowserProps) {
  const { t } = useTranslation()
  const tree = useMemo(() => buildTree(playableFileList), [playableFileList])
  const hasFolders = tree.children.size > 0
  const [selectedFolder, setSelectedFolder] = useState('root')

  const folderNode = useMemo(() => {
    if (selectedFolder === 'root') return tree
    const walk = (node: DirNode): DirNode | null => {
      if (node.id === selectedFolder) return node
      for (const child of node.children.values()) {
        const found = walk(child)
        if (found) return found
      }
      return null
    }
    return walk(tree) || tree
  }, [tree, selectedFolder])

  const filesInFolder = useMemo(() => {
    if (selectedFolder === 'root') return playableFileList
    return collectFiles(folderNode)
  }, [selectedFolder, folderNode, playableFileList])

  return (
    <div
      className={`grid min-h-[280px] w-full gap-3 ${hasFolders ? 'md:grid-cols-[220px_1fr]' : 'grid-cols-1'}`}
    >
      {hasFolders && (
        <div className='max-h-[420px] overflow-auto md:border-r md:border-default-200 md:pr-2'>
          <p className='mb-1 block text-xs text-default-500'>{t('Folders', { defaultValue: 'Folders' })}</p>
          <Button
            variant={selectedFolder === 'root' ? 'primary' : 'ghost'}
            size='sm'
            className='mb-2 w-full justify-start'
            onPress={() => setSelectedFolder('root')}
          >
            {t('AllFiles', { defaultValue: 'All files' })}
          </Button>
          <FolderTree node={tree} selectedFolder={selectedFolder} onSelect={setSelectedFolder} />
        </div>
      )}
      <FilesDataGrid
        playableFileList={filesInFolder}
        viewedFileList={viewedFileList}
        selectedSeason={selectedSeason}
        seasonAmount={seasonAmount}
        hash={hash}
      />
    </div>
  )
}
