import { Button } from '@heroui/react'
import { Folder, FolderOpen } from 'lucide-react'
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

interface DirectoryNode {
  id: string
  label: string
  children: Map<string, DirectoryNode>
  files: PlayableFile[]
}

function buildDirectoryTree(files: PlayableFile[]): DirectoryNode {
  const root: DirectoryNode = { id: 'root', label: '/', children: new Map(), files: [] }
  for (const file of files) {
    const segments = file.path.replace(/\\/g, '/').split('/').filter(Boolean)
    if (segments.length <= 1) {
      root.files.push(file)
      continue
    }
    let node = root
    for (let i = 0; i < segments.length - 1; i++) {
      const segment = segments[i]
      const id = `${node.id}/${segment}`
      if (!node.children.has(segment)) {
        node.children.set(segment, { id, label: segment, children: new Map(), files: [] })
      }
      node = node.children.get(segment)!
    }
    node.files.push(file)
  }
  return root
}

function collectFilesRecursively(node: DirectoryNode): PlayableFile[] {
  const collected = [...node.files]
  for (const child of node.children.values()) collected.push(...collectFilesRecursively(child))
  return collected
}

function findNodeById(node: DirectoryNode, id: string): DirectoryNode | null {
  if (node.id === id) return node
  for (const child of node.children.values()) {
    const found = findNodeById(child, id)
    if (found) return found
  }
  return null
}

function DirectoryTreeList({
  node,
  selectedFolderId,
  onSelect,
  depth = 0,
}: {
  node: DirectoryNode
  selectedFolderId: string
  onSelect: (id: string) => void
  depth?: number
}) {
  return (
    <>
      {[...node.children.values()].map(child => {
        const isSelected = selectedFolderId === child.id
        return (
          <div key={child.id}>
            <Button
              variant={isSelected ? 'primary' : 'ghost'}
              size='sm'
              className='mb-1 w-full justify-start gap-2'
              style={{ paddingLeft: `${8 + depth * 12}px` }}
              onPress={() => onSelect(child.id)}
            >
              {isSelected ? (
                <FolderOpen className='size-4 shrink-0' aria-hidden />
              ) : (
                <Folder className='size-4 shrink-0' aria-hidden />
              )}
              <span className='truncate'>{child.label}</span>
            </Button>
            <DirectoryTreeList node={child} selectedFolderId={selectedFolderId} onSelect={onSelect} depth={depth + 1} />
          </div>
        )
      })}
    </>
  )
}

/** Multi-file torrent browser: optional folder tree sidebar plus the file list/table. */
export default function FileBrowser({
  playableFileList,
  viewedFileList,
  selectedSeason,
  seasonAmount,
  hash,
}: FileBrowserProps) {
  const { t } = useTranslation()
  const tree = useMemo(() => buildDirectoryTree(playableFileList), [playableFileList])
  const hasFolders = tree.children.size > 0
  const [selectedFolderId, setSelectedFolderId] = useState('root')

  const filesInSelectedFolder = useMemo(() => {
    if (selectedFolderId === 'root') return playableFileList
    const node = findNodeById(tree, selectedFolderId)
    return node ? collectFilesRecursively(node) : playableFileList
  }, [selectedFolderId, tree, playableFileList])

  return (
    <div className={`grid min-h-[280px] w-full gap-3 ${hasFolders ? 'md:grid-cols-[220px_1fr]' : 'grid-cols-1'}`}>
      {hasFolders ? (
        <div className='max-h-[420px] overflow-auto md:border-r md:border-border md:pr-3'>
          <p className='mb-1 text-xs font-medium uppercase tracking-wide text-muted'>
            {t('Folders', { defaultValue: 'Folders' })}
          </p>
          <Button
            variant={selectedFolderId === 'root' ? 'primary' : 'ghost'}
            size='sm'
            className='mb-2 w-full justify-start'
            onPress={() => setSelectedFolderId('root')}
          >
            {t('AllFiles', { defaultValue: 'All files' })}
          </Button>
          <DirectoryTreeList node={tree} selectedFolderId={selectedFolderId} onSelect={setSelectedFolderId} />
        </div>
      ) : null}

      <FilesDataGrid
        playableFileList={filesInSelectedFolder}
        viewedFileList={viewedFileList}
        selectedSeason={selectedSeason}
        seasonAmount={seasonAmount}
        hash={hash}
      />
    </div>
  )
}
