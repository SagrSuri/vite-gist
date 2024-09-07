import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';

export default defineConfig({
  plugins: [react(), dts({
    insertTypesEntry: true,
    outputDir: 'dist',
  })],
  build: {
    lib: {
      entry: 'src/components/index.jsx', // Entry point for the library
      name: 'ViteGist',
      fileName: (format) => `vite-gist.${format}.js`,
      formats: ['es', 'cjs'],
    },
    rollupOptions: {
      external: ['react', 'react-dom'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
        },
      },
    },
    outDir: 'dist',
  },
});
