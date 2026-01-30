/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_LOG: string
  readonly VITE_GAME_PUBLIC: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
