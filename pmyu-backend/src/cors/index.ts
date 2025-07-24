import { CorsOptions } from 'cors';
//this handles cors port
export const corsOptions: CorsOptions = {
  methods: ['ACCEPT', 'GET', 'POST', 'DELETE', 'OPTIONS', 'PUT'],
  allowedHeaders: [
    'Accept',
    'Content-Type',
    'Authorization',
    'X-Requested-With',
    'Origin',
    'Access-Control-Allow-Headers',
    'Access-Control-Allow-Origin',
  ],
  maxAge: 3600,
  optionsSuccessStatus: 200,
  origin: ['http://localhost:4200'],
};