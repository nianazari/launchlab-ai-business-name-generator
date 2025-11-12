// FIX: Removed reference to "vite/client" to resolve "Cannot find type definition file" error.
interface ImportMetaEnv {
  readonly VITE_GEMINI_API_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}