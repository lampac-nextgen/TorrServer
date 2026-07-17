/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SERVER_HOST?: string
  readonly VITE_TMDB_API_KEY?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
