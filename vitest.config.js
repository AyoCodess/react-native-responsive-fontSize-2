import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    environment: 'node',
    setupFiles: ['./vitest.setup.js'],

    coverage: {
      enabled: false,
      provider: 'v8'
    },

    exclude: [
      '**/node_modules/**',
      '**/dist/**',
      '**/cypress/**',
      '**/.{idea,git,cache,output,temp}/**'
    ],

    alias: {
      'react-native': 'react-native-web',
    },

    globals: true,

    deps: {
      interopDefault: true,
      fallbackCJS: true
    },

    transformMode: {
      web: [/\.[jt]sx?$/],
    },

    clearMocks: true,
  },
})
