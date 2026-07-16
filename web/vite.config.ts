import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import { nodePolyfills } from 'vite-plugin-node-polyfills'

const rootDir = path.dirname(fileURLToPath(import.meta.url))

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const proxyTarget = env.VITE_SERVER_HOST || 'http://127.0.0.1:8090'

  return {
    base: './',
    plugins: [
      react(),
      nodePolyfills({
        include: ['path', 'buffer', 'stream', 'util', 'url', 'http', 'https', 'querystring'],
        globals: {
          Buffer: true,
          global: true,
          process: true,
        },
      }),
    ],
    resolve: {
      alias: {
        '@': path.resolve(rootDir, 'src'),
        components: path.resolve(rootDir, 'src/components'),
        utils: path.resolve(rootDir, 'src/utils'),
        style: path.resolve(rootDir, 'src/style'),
        icons: path.resolve(rootDir, 'src/icons'),
        locales: path.resolve(rootDir, 'src/locales'),
        i18n: path.resolve(rootDir, 'src/i18n'),
        torrentStates: path.resolve(rootDir, 'src/torrentStates'),
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
      sourcemap: true,
      chunkSizeWarningLimit: 2000,
    },
  }
})
