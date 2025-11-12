// FIX: The original `declare var process` caused a "Cannot redeclare block-scoped variable 'process'" error.
// The correct way to add types to `process.env` is by augmenting the existing `NodeJS.ProcessEnv` interface.
// This makes `process.env.API_KEY` available to TypeScript without conflicts.
declare namespace NodeJS {
  interface ProcessEnv {
    API_KEY: string;
  }
}
