/// <reference types="vite/client" />

// FIX: The reference to 'node' types was incorrect for this environment.
// This file is restored to the Vite default and extended with a declaration
// for `process.env` to support `process.env.API_KEY`, which is injected by Vite.
declare var process: {
  env: {
    API_KEY: string;
  }
};
