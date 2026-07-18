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
        features: path.resolve(rootDir, 'src/features'),
        shared: path.resolve(rootDir, 'src/shared'),
        icons: path.resolve(rootDir, 'src/icons'),
        locales: path.resolve(rootDir, 'src/locales'),
        i18n: path.resolve(rootDir, 'src/i18n'),
        torrentStates: path.resolve(rootDir, 'src/torrentStates'),
        types: path.resolve(rootDir, 'src/types'),
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
      chunkSizeWarningLimit: 900,
      rollupOptions: {
        output: {
          manualChunks: {
            mui: ['@mui/material', '@mui/icons-material', '@mui/system', '@emotion/react', '@emotion/styled'],
            'mui-x': [
              '@mui/x-data-grid',
              '@mui/x-charts',
              '@mui/x-tree-view',
              '@mui/x-date-pickers',
            ],
            hls: ['hls.js'],
            vendor: ['react', 'react-dom', '@tanstack/react-query', 'i18next', 'react-i18next', 'axios'],
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
