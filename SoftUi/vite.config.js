import viteCompression from 'vite-plugin-compression';
import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill'
import { NodeModulesPolyfillPlugin } from '@esbuild-plugins/node-modules-polyfill'
import { defineConfig } from "vite"

export default defineConfig({
    plugins: [viteCompression()],
    esbuild: {
        minify: true,
    },
    build: {
        chunkSizeWarningLimit: 1600,
        outDir: 'dist',
        minify: true,
        // lib: {
        //     entry: 'src/main.ts',
        //     name: 'SoftUI',
        //     fileName: 'softui',
        //     formats: ['es', 'cjs', 'iife', 'umd'],
        // },
    },
    optimizeDeps: {
        esbuildOptions: {
            define: {
                global: 'globalThis',
            },
            plugins: [
                NodeGlobalsPolyfillPlugin({
                    buffer: true,
                    process: true,
                }),
                NodeModulesPolyfillPlugin()
            ],
        },
    },
    define: {
        'process.env': {},
        'process.env.BROWSERSLIST_DISABLE_CACHE': false,
    }
});