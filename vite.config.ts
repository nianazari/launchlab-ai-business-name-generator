import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
// FIX: Import 'process' to ensure the correct Node.js process type is used,
// resolving the error "Property 'cwd' does not exist on type 'Process'".
import process from 'process';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // FIX: Use loadEnv to securely access environment variables
  // and prevent type conflicts with client-side env declarations.
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [react()],
    // This 'define' block is crucial for Vercel/Netlify deployments.
    // It takes the environment variable VITE_GEMINI_API_KEY (set in the deployment UI)
    // and makes it available in your client-side code as `process.env.API_KEY`.
    // This is required to adhere to the Gemini API's coding guidelines.
    define: {
      'process.env.API_KEY': JSON.stringify(env.VITE_GEMINI_API_KEY)
    }
  };
});