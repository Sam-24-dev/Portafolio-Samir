import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import type { IncomingMessage, ServerResponse } from 'node:http';
import contactHandler from './api/contact';

const contactApiPlugin = () => ({
  name: 'contact-api-dev',
  configureServer(server: {
    middlewares: {
      use: (
        path: string,
        handler: (req: IncomingMessage, res: ServerResponse, next: () => void) => void
      ) => void;
    };
  }) {
    server.middlewares.use('/api/contact', (req, res, next) => {
      if (req.method !== 'POST') {
        void contactHandler(
          { method: req.method },
          {
            status(code) {
              res.statusCode = code;
              return this;
            },
            setHeader(name, value) {
              res.setHeader(name, value);
            },
            json(payload) {
              res.end(JSON.stringify(payload));
            },
            end(payload) {
              res.end(payload);
            },
          }
        );
        return;
      }

      let rawBody = '';
      req.setEncoding('utf8');
      req.on('data', (chunk) => {
        rawBody += chunk;
      });
      req.on('end', () => {
        void contactHandler(
          {
            method: req.method,
            body: rawBody,
          },
          {
            status(code) {
              res.statusCode = code;
              return this;
            },
            setHeader(name, value) {
              res.setHeader(name, value);
            },
            json(payload) {
              res.end(JSON.stringify(payload));
            },
            end(payload) {
              res.end(payload);
            },
          }
        );
      });
      req.on('error', next);
    });
  },
});

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  Object.assign(process.env, env);

  return {
    plugins: [react(), contactApiPlugin()],
    optimizeDeps: {
      exclude: ['lucide-react'],
    },
  };
});
