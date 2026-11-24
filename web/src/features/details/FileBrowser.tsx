import { Button, Label, ListBox, Select, ToggleButton, ToggleButtonGroup, useMediaQuery } from '@heroui/react'
import { Folder, FolderOpen } from 'lucide-react'
import { iconMenu } from 'shared/ui/iconProps'
import { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import type { PlayableFile, TorrentFileStat } from 'shared/api/types'
import { queryMax } from 'shared/theme/breakpoints'

import AllFilesTree from './AllFilesTree'
import FilesDataGrid from './FilesDataGrid'
import {
  buildDirectoryTree,
  directoryTreeIsUseful,
  filesInSelectedFolder,
  flattenFolders,
  type DirectoryNode,
} from './fileTree'

interface FileBrowserProps {
  playableFileList: PlayableFile[]
  /** Every file of the torrent, playable or not. The "All files" view is hidden without more than one. */
  allFiles?: PlayableFile[]
  viewedFileList?: number[]
  selectedSeason?: number
  seasonAmount?: number[] | null
  hash: string
  allFileStats?: TorrentFileStat[]
  onViewedChange?: () => void
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
                <FolderOpen {...iconMenu} className='shrink-0' aria-hidden />
              ) : (
                <Folder {...iconMenu} className='shrink-0' aria-hidden />
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
  allFiles,
  viewedFileList,
  selectedSeason,
  seasonAmount,
  hash,
  allFileStats,
  onViewedChange,
}: FileBrowserProps) {
  const { t } = useTranslation()
  const isCompact = useMediaQuery(queryMax('mobile'))
  const tree = useMemo(() => buildDirectoryTree(playableFileList), [playableFileList])
  // A single release folder (common for series packs) isn't worth a sidebar — only show the
  // tree when there are multiple folders or nested structure to navigate.
  const hasUsefulFolders = directoryTreeIsUseful(tree)
  const [selectedFolderId, setSelectedFolderId] = useState('root')
  const [view, setView] = useState<'playlist' | 'all'>('playlist')
  const canShowAll = (allFiles?.length ?? 0) > 1
  const folderOptions = useMemo(() => flattenFolders(tree), [tree])

  const visibleFiles = useMemo(
    () => filesInSelectedFolder(playableFileList, tree, selectedFolderId),
    [selectedFolderId, tree, playableFileList],
  )

  const viewToggle = canShowAll ? (
    <ToggleButtonGroup
      selectionMode='single'
      disallowEmptySelection
      selectedKeys={[view]}
      onSelectionChange={keys => {
        const value = [...keys][0]
        if (value === 'playlist' || value === 'all') setView(value)
      }}
      className='mb-2 flex flex-wrap gap-2 sm:mb-3'
      aria-label={t('TorrentContent')}
    >
      <ToggleButton id='playlist'>{t('PlaylistShort')}</ToggleButton>
      <ToggleButton id='all'>{t('AllFiles')}</ToggleButton>
    </ToggleButtonGroup>
  ) : null

  if (view === 'all' && canShowAll) {
    return (
      <div className='w-full'>
        {viewToggle}
        <AllFilesTree files={allFiles ?? []} />
      </div>
    )
  }

  return (
    <div className='w-full'>
      {viewToggle}
      <div
        className={`grid min-h-[200px] w-full gap-3 ${hasUsefulFolders ? 'md:grid-cols-[200px_1fr]' : 'grid-cols-1'}`}
      >
        {hasUsefulFolders ? (
          isCompact ? (
            <Select
              selectedKey={selectedFolderId}
              onSelectionChange={key => {
                if (key != null) setSelectedFolderId(String(key))
              }}
              className='w-full'
              aria-label={t('Folders')}
            >
              <Label className='sr-only'>{t('Folders')}</Label>
              <Select.Trigger className='min-h-11 w-full'>
                <Select.Value />
                <Select.Indicator />
              </Select.Trigger>
              <Select.Popover>
                <ListBox>
                  <ListBox.Item id='root' textValue={t('AllFiles')}>
                    {t('AllFiles')}
                  </ListBox.Item>
                  {folderOptions.map(folder => (
                    <ListBox.Item key={folder.id} id={folder.id} textValue={folder.label}>
                      <span style={{ paddingLeft: folder.depth * 12 }}>{folder.label}</span>
                    </ListBox.Item>
                  ))}
                </ListBox>
              </Select.Popover>
            </Select>
          ) : (
            <div className='rounded-xl border border-border bg-surface-secondary p-2 md:rounded-none md:border-0 md:border-r md:border-border md:bg-transparent md:p-0 md:pr-3'>
              <p className='mb-1.5 px-1 text-xs font-medium uppercase tracking-wide text-muted'>{t('Folders')}</p>
              <Button
                variant={selectedFolderId === 'root' ? 'primary' : 'ghost'}
                size='sm'
                className='mb-1 w-full justify-start'
                onPress={() => setSelectedFolderId('root')}
              >
                {t('AllFiles')}
              </Button>
              <DirectoryTreeList node={tree} selectedFolderId={selectedFolderId} onSelect={setSelectedFolderId} />
            </div>
          )
        ) : null}

        <FilesDataGrid
          playableFileList={visibleFiles}
          viewedFileList={viewedFileList}
          selectedSeason={selectedSeason}
          seasonAmount={seasonAmount}
          hash={hash}
          allFileStats={allFileStats}
          onViewedChange={onViewedChange}
        />
      </div>
    </div>
  )
}
