/// <reference types="vitest" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import tsconfigPaths from 'vite-tsconfig-paths';
import path from 'node:path';

export default defineConfig({
    plugins: [
        react(),
        tsconfigPaths() // reads paths from tsconfig.json
    ],
    resolve: {
        // Explicit alias mirrors tsconfig "paths" so editors & Vite agree
        alias: { '@': path.resolve(__dirname, 'src') }
    },
    test: {
        globals: true,
        environment: 'happy-dom',
        setupFiles: '.vitest/setup',          // make sure this file exists
        include: ['**/*.test.{ts,tsx}']       // <- match *.test.ts(x) anywhere
    }
});
