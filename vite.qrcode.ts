// vite.qrcode.ts
import type { Plugin } from 'vite';
import os from 'os';
import qrcode from 'qrcode-terminal';

function getLocalIP(): string | null {
  const interfaces = os.networkInterfaces();
  for (const name of Object.keys(interfaces)) {
    for (const net of interfaces[name]!) {
      if (net.family === 'IPv4' && !net.internal) {
        return net.address;
      }
    }
  }
  return null;
}

export function qrCodePlugin(): Plugin {
  return {
    name: 'vite-plugin-qrcode',
    configureServer(server) {
      server.httpServer?.once('listening', () => {
        const localIP = getLocalIP();
        const port = server.config.server.port || 5173;
        if (localIP) {
          const url = `http://${localIP}:${port}`;
          console.log('\n📱 Acesse no celular com QR Code:\n');
          qrcode.generate(url, { small: true });
          console.log(`\n🌐 ${url}\n`);
        } else {
          console.warn('⚠️ Não foi possível obter o IP local da máquina.');
        }
      });
    }
  };
}
