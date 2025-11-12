// FIX: The reference to "vite/client" was causing a "Cannot find type definition file" error. This line has been removed.
// The application was updated to use `process.env.API_KEY` to align with the coding guidelines, so the previous
// type definitions for `import.meta.env` are no longer needed.
// A global `process` type is declared to make `process.env.API_KEY` available to TypeScript.

declare var process: {
  env: {
    API_KEY: string;
    [key: string]: string | undefined;
  };
};
