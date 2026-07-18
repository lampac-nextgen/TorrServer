import { memo } from 'react'
import isEqual from 'lodash/isEqual'
import { useTranslation } from 'react-i18next'
import type { PlayableFile } from 'types/api'
import FileBrowser from 'features/details/FileBrowser'

export interface TableProps {
  playableFileList?: PlayableFile[]
  viewedFileList?: number[]
  selectedSeason?: number
  seasonAmount?: number[] | null
  hash: string
}

/** Details file list — MUI X Tree View + Data Grid (FileRowActions in cells). */
const Table = memo((props: TableProps) => {
  const { t } = useTranslation()
  if (!props.playableFileList?.length) return <>{t('NoPlayableFiles')}</>
  return (
    <FileBrowser
      playableFileList={props.playableFileList}
      viewedFileList={props.viewedFileList}
      selectedSeason={props.selectedSeason}
      seasonAmount={props.seasonAmount}
      hash={props.hash}
    />
  )
}, isEqual)

export default Table
