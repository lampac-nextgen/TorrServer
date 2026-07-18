import { Button, ButtonGroup, Dropdown, Spinner, Tooltip, useMediaQuery, useOverlayState } from '@heroui/react'
import { Copy, Download, ExternalLink, Info, MoreHorizontal, Play } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import type { ExternalPlayerLink } from 'shared/lib/externalPlayers'
import { queryMax } from 'shared/theme/breakpoints'
import { iconBtn } from 'shared/ui/controlClasses'
import { useOptionalAppToast } from 'shared/ui/Toast'

export type { ExternalPlayerLink }

export interface FileRowActionsProps {
  preloadLabel: string
  onPreload: () => void
  playerSupported: boolean
  onPlay: () => void
  isPlayPending?: boolean
  openLinkHref?: string
  showOpenLink?: boolean
  copyText: string
  externalPlayers: ExternalPlayerLink[]
  onProbeMedia?: () => void
}

const playerBtn = 'min-h-11 shrink-0 px-3 font-medium'

/**
 * Per-file actions: Play + external players always visible;
 * secondary Open/Copy/Preload/Info — inline icons on desktop, overflow menu on mobile.
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
      await navigator.clipboard.writeText(copyText)
      toast?.showToast({ message: t('Copied'), severity: 'success' })
    } catch {
      toast?.showToast({ message: t('Error'), severity: 'error' })
    }
  }

  const openExternal = () => {
    if (openLinkHref) window.open(openLinkHref, '_blank', 'noopener,noreferrer')
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

  const playButton = playerSupported ? (
    <Button
      variant='primary'
      size='sm'
      className='min-h-11 shrink-0 px-3'
      isPending={isPlayPending}
      onPress={onPlay}
    >
      {({ isPending }) => (
        <>
          {isPending ? <Spinner size='sm' color='current' /> : <Play fill='currentColor' aria-hidden />}
          {t('Play')}
        </>
      )}
    </Button>
  ) : showOpenLink && openLinkHref ? (
    <Button
      variant='primary'
      size='sm'
      className='min-h-11 shrink-0 px-3'
      onPress={openExternal}
    >
      <Play fill='currentColor' aria-hidden />
      {t('Play')}
    </Button>
  ) : null

  const showOpenIcon = Boolean(showOpenLink && openLinkHref && playerSupported)

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
        <Button
          variant='secondary'
          size='sm'
          isIconOnly
          className={iconBtn}
          aria-label={t('Actions')}
        >
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

  return (
    <div
      className={
        isMobile
          ? 'flex w-full min-w-0 items-center gap-1.5 overflow-x-auto'
          : 'flex flex-nowrap items-center gap-1'
      }
    >
      {playButton}
      {externalPlayers.length > 1 ? (
        <ButtonGroup className='shrink-0'>{externalButtons}</ButtonGroup>
      ) : (
        externalButtons
      )}
      {isMobile ? secondaryMobile : secondaryDesktop}
    </div>
  )
}
