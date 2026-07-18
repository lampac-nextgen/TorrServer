import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import { nodePolyfills } from 'vite-plugin-node-polyfills'

/// <reference types="vitest/config" />

const rootDir = path.dirname(fileURLToPath(import.meta.url))

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const proxyTarget = env.VITE_SERVER_HOST || 'http://127.0.0.1:8090'

  if (mode === 'production' && env.VITE_SERVER_HOST) {
    const host = env.VITE_SERVER_HOST.toLowerCase()
    if (host.includes('localhost') || host.includes('127.0.0.1')) {
      throw new Error(
        `Refuse production build with VITE_SERVER_HOST=${env.VITE_SERVER_HOST} (would bake a local API into the embed). Unset it for release.`,
      )
    }
  }

  return {
    base: './',
    plugins: [
      react(),
      nodePolyfills({
        include: ['buffer', 'stream', 'util', 'path'],
        globals: { Buffer: true, global: true, process: true },
      }),
    ],
    resolve: {
      alias: {
        '@': path.resolve(rootDir, 'src'),
        features: path.resolve(rootDir, 'src/features'),
        shared: path.resolve(rootDir, 'src/shared'),
        app: path.resolve(rootDir, 'src/app'),
        locales: path.resolve(rootDir, 'src/locales'),
      },
    },
    server: {
      port: 3000,
      proxy: {
        '/torrents': proxyTarget,
        '/viewed': proxyTarget,
        '/cache': proxyTarget,
        '/torrent': proxyTarget,
        '/settings': proxyTarget,
        '/stream': proxyTarget,
        '/shutdown': proxyTarget,
        '/echo': proxyTarget,
        '/torznab': proxyTarget,
        '/search': proxyTarget,
        '/tmdb': proxyTarget,
        '/gst': proxyTarget,
      },
    },
    build: {
      outDir: 'build',
      assetsDir: 'static',
      emptyOutDir: true,
      sourcemap: false,
      target: ['chrome117', 'firefox121', 'safari17', 'edge121'],
      chunkSizeWarningLimit: 1300,
      rolldownOptions: {
        output: {
          codeSplitting: {
            groups: [
              { name: 'hls', test: /node_modules[/\\]hls\.js/ },
              { name: 'mui', test: /node_modules[/\\](?:@mui[/\\]|@emotion[/\\]|dayjs[/\\])/ },
              {
                name: 'vendor',
                test: /node_modules[/\\](?:react-dom[/\\]|scheduler[/\\]|@tanstack[/\\]react-query[/\\]|i18next|axios[/\\]|react[/\\])/,
              },
            ],
          },
        },
      },
    },
    test: {
      environment: 'node',
      include: ['src/**/*.test.ts'],
    },
  }
})
