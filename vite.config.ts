import { defineConfig } from 'vite';

import vue from '@vitejs/plugin-vue';
// @ts-ignore
import * as path from 'path';

export default defineConfig({
  plugins: [
    vue(),
  ],
});
