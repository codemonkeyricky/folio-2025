import 'dotenv/config'
import restart from 'vite-plugin-restart'
import wasm from 'vite-plugin-wasm'
import topLevelAwait from 'vite-plugin-top-level-await'
import basicSsl from '@vitejs/plugin-basic-ssl'
import { nodePolyfills } from 'vite-plugin-node-polyfills'
import { defineConfig } from 'vite'
import { resolve } from 'path'
import typescript from 'typescript'

export default defineConfig({
    root: 'sources/', // Sources files (typically where index.html is)
    envDir: '../',  // Directory where the env file is located
    publicDir: '../static/', // Path from "root" to static assets (files that are served as they are)
    base: './', // Public path (what's after the domain)
    server:
    {
        // https: true,
        host: true, // Open to local network and display URL
        open: true // Open in browser
    },
    build:
    {
        outDir: '../dist', // Output in the dist/ folder
        emptyOutDir: true, // Empty the folder first
        sourcemap: false // Add sourcemap
    },
    plugins:
    [
        {
            name: 'vite-ts-transform',
            transform(code, id) {
                if (id.endsWith('.ts') && !id.includes('node_modules')) {
                    try {
                        const result = typescript.transform(code, [], {}, {
                            module: 'ES2020',
                            moduleResolution: 'node',
                            target: 'ES2020',
                            strict: true,
                            esModuleInterop: true,
                            skipLibCheck: true
                        })
                        return {
                            code: result.code,
                            map: result.map
                        }
                    } catch (e) {
                        console.error(`Error compiling ${id}:`, e)
                    }
                }
            }
        },
        wasm(),
        topLevelAwait(),
        restart({ restart: [ '../static/**', ] }), // Restart server on static file change
        nodePolyfills(),
        // basicSsl()
    ],
    esbuild: {
        tsconfigRaw: {
            compilerOptions: {
                strict: true
            }
        }
    },
    resolve: {
        alias: {
            '@': resolve(__dirname, 'sources')
        }
    }
})