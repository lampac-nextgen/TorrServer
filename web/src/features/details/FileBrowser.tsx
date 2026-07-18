import { useMemo, useState } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { SimpleTreeView } from '@mui/x-tree-view/SimpleTreeView'
import { TreeItem } from '@mui/x-tree-view/TreeItem'
import { useTranslation } from 'react-i18next'
import type { PlayableFile } from 'types/api'

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

function renderTreeItems(node: DirNode): React.ReactNode {
  return [...node.children.values()].map(child => (
    <TreeItem key={child.id} itemId={child.id} label={child.label}>
      {renderTreeItems(child)}
    </TreeItem>
  ))
}

/** Multi-file browser: Tree View folders + Data Grid files (MUI X). */
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
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: hasFolders ? { xs: '1fr', md: '220px 1fr' } : '1fr',
        gap: 1.5,
        minHeight: 280,
        width: '100%',
      }}
    >
      {hasFolders && (
        <Box sx={{ borderRight: { md: 1 }, borderColor: 'divider', pr: { md: 1 }, maxHeight: 420, overflow: 'auto' }}>
          <Typography variant='caption' color='text.secondary' sx={{ display: 'block', mb: 0.5 }}>
            {t('Folders', { defaultValue: 'Folders' })}
          </Typography>
          <SimpleTreeView
            selectedItems={selectedFolder}
            onSelectedItemsChange={(_, id) => setSelectedFolder((id as string) || 'root')}
          >
            <TreeItem itemId='root' label={t('AllFiles', { defaultValue: 'All files' })}>
              {renderTreeItems(tree)}
            </TreeItem>
          </SimpleTreeView>
        </Box>
      )}
      <FilesDataGrid
        playableFileList={filesInFolder}
        viewedFileList={viewedFileList}
        selectedSeason={selectedSeason}
        seasonAmount={seasonAmount}
        hash={hash}
      />
    </Box>
  )
}
