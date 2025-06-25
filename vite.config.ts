import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { qrCodePlugin } from './vite.qrcode';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), qrCodePlugin()],
  server: {
    host: true
  }
});
