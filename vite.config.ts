import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // This 'define' block is crucial for Vercel/Netlify deployments.
  // It takes the environment variable VITE_GEMINI_API_KEY (set in the deployment UI)
  // and makes it available in your client-side code as `process.env.API_KEY`.
  // This is required to adhere to the Gemini API's coding guidelines.
  define: {
    'process.env.API_KEY': JSON.stringify(process.env.VITE_GEMINI_API_KEY)
  }
});