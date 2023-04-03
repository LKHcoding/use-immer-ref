import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';
import dts from 'vite-plugin-dts';

const __dirname = path.resolve();

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    dts({
      outputDir: 'dist',
    }),
  ],
  build: {
    sourcemap: true,
    outDir: 'dist/hooks',
    lib: {
      entry: {
        useImmerRef: path.resolve(__dirname, 'src/hooks/useImmerRef.ts'),
      },
      name: 'useImmerRef',
      fileName: (format, entryName) => `${entryName}.${format}.js`,
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
  },
});
