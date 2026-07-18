const { protocol, hostname, port } = window.location

const torrserverHost = import.meta.env.VITE_SERVER_HOST || `${protocol}//${hostname}${port ? `:${port}` : ''}`

export const torrentsHost = () => `${torrserverHost}/torrents`
export const viewedHost = () => `${torrserverHost}/viewed`
export const cacheHost = () => `${torrserverHost}/cache`
export const torrentUploadHost = () => `${torrserverHost}/torrent/upload`
export const settingsHost = () => `${torrserverHost}/settings`
export const streamHost = () => `${torrserverHost}/stream`
export const shutdownHost = () => `${torrserverHost}/shutdown`
export const echoHost = () => `${torrserverHost}/echo`
export const playlistTorrHost = streamHost
export const torznabSearchHost = () => `${torrserverHost}/torznab/search/`
export const torznabCapsHost = () => `${torrserverHost}/torznab/caps`
export const searchHost = () => `${torrserverHost}/search/`
export const torznabTestHost = () => `${torrserverHost}/torznab/test`
export const tmdbSettingsHost = () => `${torrserverHost}/tmdb/settings`
export const gstSettingsHost = () => `${torrserverHost}/gst/settings`
export const gstEchoHost = () => `${torrserverHost}/gst/echo`
export const storageSettingsHost = () => `${torrserverHost}/storage/settings`

export const getTorrServerHost = () => torrserverHost
