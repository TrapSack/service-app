import react from '@vitejs/plugin-react';
import { UserConfig, ConfigEnv } from 'vite';
import { join, resolve } from 'path';

const srcRoot = join(__dirname, 'src');

const aliases = {
  '@': srcRoot,
  '@Assets': resolve('./src/assets'),
  '@Hooks': resolve('./src/hooks'),
  '@Context': resolve('./src/contexts'),
  '@Pages': resolve('./src/pages'),
  '@Types': resolve('./src/types'),
  '@Components': resolve('./src/components')
};

export default ({ command }: ConfigEnv): UserConfig => {
  console.log(join(srcRoot, '/assets'));
  // DEV
  if (command === 'serve') {
    return {
      root: srcRoot,
      base: '/',
      plugins: [react()],
      resolve: {
        alias: aliases
      },
      build: {
        outDir: join(srcRoot, '/out'),
        emptyOutDir: true,
        rollupOptions: {}
      },
      server: {
        port: !process.env.PORT ? 3000 : +process.env.PORT
      },
      optimizeDeps: {
        exclude: ['path']
      }
    };
  }
  // PROD
  return {
    root: srcRoot,
    base: './',
    plugins: [react()],
    resolve: {
      alias: aliases
    },
    build: {
      outDir: join(srcRoot, '/out'),
      emptyOutDir: true,
      rollupOptions: {}
    },
    server: {
      port: process.env.PORT === undefined ? 3000 : +process.env.PORT
    },
    optimizeDeps: {
      exclude: ['path']
    }
  };
};
