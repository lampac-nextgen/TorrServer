import { Button, ButtonGroup, Dropdown, Spinner, Tooltip, useMediaQuery, useOverlayState } from '@heroui/react'
import { Copy, Download, ExternalLink, Info, MoreHorizontal, Play } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import type { ExternalPlayerLink } from 'shared/lib/externalPlayers'
import { copyToClipboard } from 'shared/lib/clipboard'
import { queryMax } from 'shared/theme/breakpoints'
import { iconBtn } from 'shared/ui/controlClasses'
import { useOptionalAppToast } from 'shared/ui/Toast'

export type { ExternalPlayerLink }

export interface FileRowActionsProps {
  /** Localized preload / buffer button label (TorrentDetails preload wording). */
  preloadLabel: string
  onPreload: () => void
  /** False when the in-app player cannot handle this file — show open-link Play fallback. */
  playerSupported: boolean
  onPlay: () => void
  isPlayPending?: boolean
  openLinkHref?: string
  showOpenLink?: boolean
  /** Direct stream URL copied by "Copy link". */
  copyText: string
  /** Deep links for Infuse / VLC / etc. — always visible; never buried in the More menu. */
  externalPlayers: ExternalPlayerLink[]
  onProbeMedia?: () => void
}

/** Desktop / tablet external-player chip. */
const playerBtn = 'min-h-11 shrink-0 px-3 font-medium'
/** Mobile equal-width chips under Play — `flex-1` + truncate so long labels never overflow. */
const playerBtnMobile = 'min-h-11 min-w-0 flex-1 px-2 text-xs font-medium'

/**
 * Per-file action strip for the details Files tab.
 *
 * Layout contract:
 * - Play is always primary and reachable (doctrine).
 * - External players stay on-screen (not only in a menu).
 * - Open / Copy / Preload / MediaInfo: icon row on desktop; `⋯` Dropdown on mobile.
 * - Mobile uses two stacked rows (Play+More, then equal external chips) — never
 *   `overflow-x-auto`, which clipped VLC on narrow phones.
 */
export default function FileRowActions({
  preloadLabel,
  onPreload,
  playerSupported,
  onPlay,
  isPlayPending = false,
  openLinkHref,
  showOpenLink,
  copyText,
  externalPlayers,
  onProbeMedia,
}: FileRowActionsProps) {
  const { t } = useTranslation()
  const toast = useOptionalAppToast()
  const isMobile = useMediaQuery(queryMax('mobile'))
  const moreMenu = useOverlayState()

  const copyDirectLink = async () => {
    try {
      await copyToClipboard(copyText)
      toast?.showToast({ message: t('Copied'), severity: 'success' })
    } catch {
      toast?.showToast({ message: t('Error'), severity: 'error' })
    }
  }

  const openExternal = () => {
    if (openLinkHref) window.open(openLinkHref, '_blank', 'noopener,noreferrer')
  }

  const showOpenIcon = Boolean(showOpenLink && openLinkHref && playerSupported)

  const playButton = (className: string) =>
    playerSupported ? (
      <Button variant='primary' size='sm' className={className} isPending={isPlayPending} onPress={onPlay}>
        {({ isPending }) => (
          <>
            {isPending ? <Spinner size='sm' color='current' /> : <Play fill='currentColor' aria-hidden />}
            {t('Play')}
          </>
        )}
      </Button>
    ) : showOpenLink && openLinkHref ? (
      <Button variant='primary' size='sm' className={className} onPress={openExternal}>
        <Play fill='currentColor' aria-hidden />
        {t('Play')}
      </Button>
    ) : null

  const secondaryDesktop = (
    <>
      {showOpenIcon ? (
        <Tooltip.Root>
          <Tooltip.Trigger>
            <Button
              variant='secondary'
              size='sm'
              isIconOnly
              className={iconBtn}
              aria-label={t('OpenLink')}
              onPress={openExternal}
            >
              <ExternalLink aria-hidden />
            </Button>
          </Tooltip.Trigger>
          <Tooltip.Content>{t('OpenLink')}</Tooltip.Content>
        </Tooltip.Root>
      ) : null}

      <Tooltip.Root>
        <Tooltip.Trigger>
          <Button
            variant='secondary'
            size='sm'
            isIconOnly
            className={iconBtn}
            aria-label={t('CopyLink')}
            onPress={() => void copyDirectLink()}
          >
            <Copy aria-hidden />
          </Button>
        </Tooltip.Trigger>
        <Tooltip.Content>{t('CopyLink')}</Tooltip.Content>
      </Tooltip.Root>

      <Tooltip.Root>
        <Tooltip.Trigger>
          <Button
            variant='secondary'
            size='sm'
            isIconOnly
            className={iconBtn}
            aria-label={preloadLabel}
            onPress={onPreload}
          >
            <Download aria-hidden />
          </Button>
        </Tooltip.Trigger>
        <Tooltip.Content>{preloadLabel}</Tooltip.Content>
      </Tooltip.Root>

      {onProbeMedia ? (
        <Tooltip.Root>
          <Tooltip.Trigger>
            <Button
              variant='secondary'
              size='sm'
              isIconOnly
              className={iconBtn}
              aria-label={t('MediaInfo')}
              onPress={onProbeMedia}
            >
              <Info aria-hidden />
            </Button>
          </Tooltip.Trigger>
          <Tooltip.Content>{t('MediaInfo')}</Tooltip.Content>
        </Tooltip.Root>
      ) : null}
    </>
  )

  const secondaryMobile = (
    <Dropdown isOpen={moreMenu.isOpen} onOpenChange={moreMenu.setOpen}>
      <Dropdown.Trigger>
        <Button variant='secondary' size='sm' isIconOnly className={iconBtn} aria-label={t('Actions')}>
          <MoreHorizontal aria-hidden />
        </Button>
      </Dropdown.Trigger>
      <Dropdown.Popover placement='bottom end'>
        <Dropdown.Menu aria-label={t('Actions')}>
          {showOpenIcon ? (
            <Dropdown.Item
              onPress={() => {
                moreMenu.close()
                openExternal()
              }}
            >
              <ExternalLink size={16} />
              {t('OpenLink')}
            </Dropdown.Item>
          ) : null}
          <Dropdown.Item
            onPress={() => {
              moreMenu.close()
              void copyDirectLink()
            }}
          >
            <Copy size={16} />
            {t('CopyLink')}
          </Dropdown.Item>
          <Dropdown.Item
            onPress={() => {
              moreMenu.close()
              onPreload()
            }}
          >
            <Download size={16} />
            {preloadLabel}
          </Dropdown.Item>
          {onProbeMedia ? (
            <Dropdown.Item
              onPress={() => {
                moreMenu.close()
                onProbeMedia()
              }}
            >
              <Info size={16} />
              {t('MediaInfo')}
            </Dropdown.Item>
          ) : null}
        </Dropdown.Menu>
      </Dropdown.Popover>
    </Dropdown>
  )

  if (isMobile) {
    return (
      <div className='flex w-full min-w-0 flex-col gap-1.5'>
        <div className='flex w-full min-w-0 items-center gap-1.5'>
          {playButton('min-h-11 min-w-0 flex-1 px-3')}
          {secondaryMobile}
        </div>
        {externalPlayers.length > 0 ? (
          <div className='flex w-full min-w-0 gap-1.5'>
            {externalPlayers.map(player => (
              <Button
                key={player.label}
                variant='secondary'
                size='sm'
                className={playerBtnMobile}
                onPress={() => {
                  window.location.href = player.href
                }}
              >
                <span className='truncate'>{player.label}</span>
              </Button>
            ))}
          </div>
        ) : null}
      </div>
    )
  }

  const externalButtons = externalPlayers.map(player => (
    <Button
      key={player.label}
      variant='secondary'
      size='sm'
      className={playerBtn}
      onPress={() => {
        window.location.href = player.href
      }}
    >
      {player.label}
    </Button>
  ))

  return (
    <div className='flex flex-nowrap items-center gap-1'>
      {playButton('min-h-11 shrink-0 px-3')}
      {externalPlayers.length > 1 ? <ButtonGroup className='shrink-0'>{externalButtons}</ButtonGroup> : externalButtons}
      {secondaryDesktop}
    </div>
  )
}
