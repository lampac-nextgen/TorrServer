import { Button, Dropdown } from '@heroui/react'
import { ChevronDown, ChevronRight, Copy, Eye, File as FileIcon, Folder, FolderOpen } from 'lucide-react'
import { memo, useCallback, useMemo, useRef, useState, type KeyboardEvent } from 'react'
import { useTranslation } from 'react-i18next'
import type { PlayableFile } from 'shared/api/types'
import { copyToClipboard } from 'shared/lib/clipboard'
import { humanizeSizePrecise } from 'shared/lib/format'
import { iconMenu } from 'shared/ui/iconProps'
import { useOptionalAppToast } from 'shared/ui/Toast'

import {
  buildDirectoryTree,
  collectFolderIds,
  summarizeTree,
  visibleTreeRows,
  type DirectoryNode,
  type TreeRow,
} from './fileTree'

/** Open the first level by default unless that alone is already a long list. */
const AUTO_EXPAND_LIMIT = 30

function initialExpanded(tree: DirectoryNode): Set<string> {
  return tree.children.size <= AUTO_EXPAND_LIMIT ? new Set([...tree.children.values()].map(c => c.id)) : new Set()
}

interface TreeRowViewProps {
  row: TreeRow
  active: boolean
  viewed: boolean
  onToggle: (key: string) => void
  onFocusRow: (key: string) => void
  onCopy: (value: string) => void
  copyNameLabel: string
  copyPathLabel: string
  viewedLabel: string
  filesLabel: string
}

const TreeRowView = memo(function TreeRowView({
  row,
  active,
  viewed,
  onToggle,
  onFocusRow,
  onCopy,
  copyNameLabel,
  copyPathLabel,
  viewedLabel,
  filesLabel,
}: TreeRowViewProps) {
  const isFolder = row.kind === 'folder'
  const Icon = isFolder ? (row.expanded ? FolderOpen : Folder) : FileIcon
  return (
    <div
      role='treeitem'
      aria-level={row.depth + 1}
      aria-expanded={isFolder ? Boolean(row.expanded) : undefined}
      aria-selected={active}
      data-key={row.key}
      tabIndex={active ? 0 : -1}
      onFocus={() => onFocusRow(row.key)}
      onClick={isFolder ? () => onToggle(row.key) : undefined}
      className={`flex min-h-11 items-center gap-2 rounded-lg px-2 [content-visibility:auto] [contain-intrinsic-size:auto_44px] hover-fine:bg-surface-secondary focus-visible:outline-2 focus-visible:outline-accent ${
        isFolder ? 'cursor-pointer' : ''
      }`}
      style={{ paddingLeft: `${8 + row.depth * 16}px` }}
    >
      <span className='flex size-4 shrink-0 items-center justify-center text-muted' aria-hidden>
        {isFolder ? row.expanded ? <ChevronDown {...iconMenu} /> : <ChevronRight {...iconMenu} /> : null}
      </span>
      <Icon {...iconMenu} className='shrink-0 text-muted' aria-hidden />
      {/* Wrap instead of truncating: episode names share a long prefix and differ at the end. */}
      <span className='line-clamp-2 min-w-0 flex-1 text-sm text-foreground [overflow-wrap:anywhere]' title={row.path}>
        {row.label}
      </span>
      {viewed ? <Eye {...iconMenu} className='shrink-0 text-accent' aria-label={viewedLabel} role='img' /> : null}
      <span className='flex shrink-0 flex-col items-end text-xs tabular-nums text-muted'>
        <span>{humanizeSizePrecise(row.size)}</span>
        {isFolder ? <span>{filesLabel}</span> : null}
      </span>
      <Dropdown>
        <Button
          variant='ghost'
          size='sm'
          isIconOnly
          className='min-h-11 min-w-11 shrink-0 text-muted'
          aria-label={`${copyNameLabel}: ${row.label}`}
          onClick={e => e.stopPropagation()}
        >
          <Copy {...iconMenu} aria-hidden />
        </Button>
        <Dropdown.Popover placement='bottom end'>
          <Dropdown.Menu aria-label={copyNameLabel}>
            <Dropdown.Item onPress={() => onCopy(row.label)}>{copyNameLabel}</Dropdown.Item>
            <Dropdown.Item onPress={() => onCopy(row.path)}>{copyPathLabel}</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown.Popover>
      </Dropdown>
    </div>
  )
})

interface AllFilesTreeProps {
  files: PlayableFile[]
  /** File ids already watched; they get a small eye mark. */
  viewedFileList?: number[]
}

/** Every file of the torrent as a collapsible directory tree with folder sizes and file counts. */
export default function AllFilesTree({ files, viewedFileList }: AllFilesTreeProps) {
  const { t } = useTranslation()
  const toast = useOptionalAppToast()
  const treeRef = useRef<HTMLDivElement | null>(null)
  const tree = useMemo(() => buildDirectoryTree(files), [files])
  const summaries = useMemo(() => summarizeTree(tree), [tree])
  const [expanded, setExpanded] = useState<Set<string>>(() => initialExpanded(tree))
  const [activeKey, setActiveKey] = useState<string | null>(null)

  const rows = useMemo(() => visibleTreeRows(tree, expanded, summaries), [tree, expanded, summaries])
  const rootSummary = summaries.get('root')
  const viewedIds = useMemo(() => new Set(viewedFileList ?? []), [viewedFileList])
  const hasFolders = tree.children.size > 0
  const currentKey = rows.some(r => r.key === activeKey) ? activeKey : (rows[0]?.key ?? null)

  const toggle = useCallback((key: string) => {
    setExpanded(prev => {
      const next = new Set(prev)
      if (next.has(key)) next.delete(key)
      else next.add(key)
      return next
    })
  }, [])

  const copy = useCallback(
    async (value: string) => {
      try {
        await copyToClipboard(value)
        toast?.showToast({ message: t('Copied'), severity: 'success' })
      } catch {
        toast?.showToast({ message: t('Error'), severity: 'error' })
      }
    },
    [t, toast],
  )

  const focusKey = (key: string | undefined) => {
    if (!key) return
    setActiveKey(key)
    requestAnimationFrame(() => {
      treeRef.current?.querySelector<HTMLElement>(`[data-key="${CSS.escape(key)}"]`)?.focus()
    })
  }

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.target instanceof HTMLElement && e.target.getAttribute('role') !== 'treeitem') return
    const index = rows.findIndex(r => r.key === currentKey)
    if (index < 0) return
    const row = rows[index]
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault()
        focusKey(rows[Math.min(index + 1, rows.length - 1)]?.key)
        break
      case 'ArrowUp':
        e.preventDefault()
        focusKey(rows[Math.max(index - 1, 0)]?.key)
        break
      case 'Home':
        e.preventDefault()
        focusKey(rows[0]?.key)
        break
      case 'End':
        e.preventDefault()
        focusKey(rows[rows.length - 1]?.key)
        break
      case 'ArrowRight':
        if (row.kind === 'folder') {
          e.preventDefault()
          if (!row.expanded) toggle(row.key)
          else focusKey(rows[index + 1]?.key)
        }
        break
      case 'ArrowLeft':
        if (row.kind === 'folder' && row.expanded) {
          e.preventDefault()
          toggle(row.key)
        } else {
          e.preventDefault()
          const parent = [...rows.slice(0, index)].reverse().find(r => r.kind === 'folder' && r.depth < row.depth)
          focusKey(parent?.key)
        }
        break
      case 'Enter':
      case ' ':
        if (row.kind === 'folder') {
          e.preventDefault()
          toggle(row.key)
        }
        break
    }
  }

  return (
    <div className='flex w-full flex-col gap-2'>
      <div className='flex flex-wrap items-center justify-between gap-2'>
        <p className='text-xs text-muted'>
          {t('FilesCount', { count: rootSummary?.fileCount ?? 0 })} · {humanizeSizePrecise(rootSummary?.size ?? 0)}
        </p>
        {hasFolders ? (
          <div className='flex gap-1.5'>
            <Button
              variant='ghost'
              size='sm'
              className='min-h-11'
              onPress={() => setExpanded(new Set(collectFolderIds(tree)))}
            >
              {t('ExpandAll')}
            </Button>
            <Button variant='ghost' size='sm' className='min-h-11' onPress={() => setExpanded(new Set())}>
              {t('CollapseAll')}
            </Button>
          </div>
        ) : null}
      </div>
      <div
        ref={treeRef}
        role='tree'
        aria-label={t('AllFiles')}
        onKeyDown={onKeyDown}
        className='rounded-xl border border-border bg-surface p-1'
      >
        {rows.map(row => (
          <TreeRowView
            key={row.key}
            row={row}
            active={row.key === currentKey}
            viewed={row.fileId != null && viewedIds.has(row.fileId)}
            onToggle={toggle}
            onFocusRow={setActiveKey}
            onCopy={value => void copy(value)}
            copyNameLabel={t('CopyName')}
            copyPathLabel={t('CopyPath')}
            viewedLabel={t('Viewed')}
            filesLabel={t('FilesCount', { count: row.fileCount })}
          />
        ))}
      </div>
    </div>
  )
}
