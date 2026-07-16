import { useEffect, useState } from 'react'

interface LaunchQueueFileHandle {
  getFile: () => Promise<File>
}

interface LaunchParams {
  files?: LaunchQueueFileHandle[]
}

interface LaunchQueue {
  setConsumer: (callback: (params: LaunchParams) => void | Promise<void>) => void
}

declare global {
  interface Window {
    launchQueue?: LaunchQueue
  }
}

/** Handles PWA launch via protocol_handlers (magnet:), share_target, and file_handlers (.torrent) */
export default function useLaunchHandler() {
  const [launchSource, setLaunchSource] = useState<string | null>(null)
  const [launchFiles, setLaunchFiles] = useState<File[] | null>(null)

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const source = params.get('magnet') || params.get('url') || params.get('text') || null

    if (source) {
      setLaunchSource(source)
      window.history.replaceState(null, '', window.location.pathname)
    }

    if (window.launchQueue) {
      window.launchQueue.setConsumer(async launchParams => {
        if (!launchParams.files || launchParams.files.length === 0) return
        const files = await Promise.all(launchParams.files.map(fh => fh.getFile()))
        const torrentFiles = files.filter(f => f.name.toLowerCase().endsWith('.torrent'))
        if (torrentFiles.length > 0) setLaunchFiles(torrentFiles)
      })
    }
  }, [])

  return { launchSource, setLaunchSource, launchFiles, setLaunchFiles }
}
