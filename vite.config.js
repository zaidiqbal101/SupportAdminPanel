import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';

export default defineConfig({
    server: {
        proxy: {
            '/storage': {
                target: 'http://127.0.0.1:8001',
                changeOrigin: true,
            },
            '/attachments': {
                target: 'http://127.0.0.1:8001',
                changeOrigin: true,
            },
        },
    },
    plugins: [
        laravel({
            input: 'resources/js/app.jsx',
            refresh: true,
        }),
        react(),
    ],
});
