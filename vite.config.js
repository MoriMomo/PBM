import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react-swc';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
    plugins: [
        laravel({
            input: 'resources/js/app.tsx',
            refresh: true,
        }),
        react(),
        tailwindcss(),
    ],
    optimizeDeps: {
        force: true,
        exclude: ['resources/js'],
    },
    build: {
        cssMinify: true,
        rollupOptions: {
            output: {
                manualChunks(id) {
                    if (id.includes('node_modules/react/') || id.includes('node_modules/react-dom/')) {
                        return 'vendor-react';
                    }
                    if (id.includes('node_modules/@inertiajs/')) {
                        return 'vendor-inertia';
                    }
                    if (id.includes('node_modules/axios/')) {
                        return 'vendor-axios';
                    }
                    if (id.includes('node_modules/lucide-react/')) {
                        return 'vendor-lucide';
                    }
                },
            },
        },
    },
});
