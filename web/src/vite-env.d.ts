/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SERVER_HOST?: string
  readonly VITE_TMDB_API_KEY?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

declare namespace React {
  namespace JSX {
    interface IntrinsicElements {
      'lord-icon': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          src?: string
          trigger?: string
          colors?: string
          stroke?: string
          scale?: string
          delay?: string
        },
        HTMLElement
      >
    }
  }
}
