import { fileURLToPath, URL } from 'node:url';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

export default defineConfig({
    plugins: [react(), dts({ tsconfigPath: './tsconfig.build.json', insertTypesEntry: true })],
    resolve: { alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) } },
    build: {
        lib: {
            entry: fileURLToPath(new URL('./src/index.ts', import.meta.url)),
            formats: ['es'],
            fileName: 'text-editor-react',
            cssFileName: 'style',
        },
        rollupOptions: {
            external: ['react', 'react-dom', 'react/jsx-runtime'],
            output: { globals: { react: 'React', 'react-dom': 'ReactDOM' } },
        },
        sourcemap: true,
    },
});
