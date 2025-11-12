
// FIX: Replaced `declare var process` with an augmentation of the NodeJS.ProcessEnv
// interface. This prevents the "Cannot redeclare" error and correctly types `process.env`
// for both client-side code and the vite.config.ts file, resolving type conflicts.
declare namespace NodeJS {
  interface ProcessEnv {
    API_KEY: string;
  }
}