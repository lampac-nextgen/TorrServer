import { Button, Input, Label, ListBox, Select, TextField, useMediaQuery } from '@heroui/react'
import { EyeOff, Folder, FolderOpen, Search, X } from 'lucide-react'
import { iconMenu } from 'shared/ui/iconProps'
import { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import type { PlayableFile, TorrentFileStat } from 'shared/api/types'
import { queryMax } from 'shared/theme/breakpoints'

import { FILE_FILTER_MIN_FILES } from './fileFilter'
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
  const [nameQuery, setNameQuery] = useState('')
  const [onlyUnviewed, setOnlyUnviewed] = useState(false)
  const showFilters = playableFileList.length >= FILE_FILTER_MIN_FILES
  const folderOptions = useMemo(() => flattenFolders(tree), [tree])

  const visibleFiles = useMemo(
    () => filesInSelectedFolder(playableFileList, tree, selectedFolderId),
    [selectedFolderId, tree, playableFileList],
  )

  const filters = showFilters ? (
    <div className='mb-2 flex flex-wrap items-center gap-2 sm:mb-3 sm:flex-nowrap'>
      <TextField
        aria-label={t('FilterFiles')}
        value={nameQuery}
        onChange={setNameQuery}
        className='relative min-w-0 basis-full sm:basis-0 sm:flex-1'
      >
        <Label className='sr-only'>{t('FilterFiles')}</Label>
        <Search
          {...iconMenu}
          className='pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-muted'
          aria-hidden
        />
        <Input placeholder={t('FilterFiles')} className='min-h-11 w-full border-border bg-surface pr-11 pl-9 text-sm' />
        {nameQuery ? (
          <Button
            isIconOnly
            size='sm'
            variant='ghost'
            className='absolute top-1/2 right-1 size-9 min-h-0 min-w-0 -translate-y-1/2 text-muted'
            aria-label={t('Clear')}
            onPress={() => setNameQuery('')}
          >
            <X {...iconMenu} aria-hidden />
          </Button>
        ) : null}
      </TextField>
      <Button
        variant={onlyUnviewed ? 'primary' : 'secondary'}
        className='min-h-11 shrink-0 gap-2 rounded-xl px-3'
        aria-pressed={onlyUnviewed}
        onPress={() => setOnlyUnviewed(v => !v)}
      >
        <EyeOff {...iconMenu} aria-hidden />
        {t('OnlyUnviewed')}
      </Button>
    </div>
  ) : null

  return (
    <div className='w-full'>
      {filters}
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
          nameQuery={nameQuery}
          onlyUnviewed={onlyUnviewed}
        />
      </div>
    </div>
  )
}
