import createError from 'http-errors';
import express from 'express';
import cors from 'cors';
import path from 'path';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import http from 'http';
import logger from 'morgan';

dotenv.config({ path: path.join(__dirname, '../.env') });
import { handleError } from './helpers/error';
import httpLogger from './middlewares/httpLogger';
import CompaniesRoute from './routes/companies.routes';
import correlationIdMiddleware from './middlewares/express-correlation-id-mw';
import requestLoggingMiddleware from './middlewares/request-logging-middleware';

const app: express.Application = express();

app.use(cors())

app.use(httpLogger);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(correlationIdMiddleware);
app.use(requestLoggingMiddleware);
app.use(logger('combined'));

const routes = [
  new CompaniesRoute(),
];
routes.forEach((route) => {
 app.use('/', route.router);
});

// catch 404 and forward to error handler
app.use((_req, _res, next) => {
  next(createError(404));
});

// error handler
const errorHandler: express.ErrorRequestHandler = (err, _req, res, _next) => { handleError(err, res); }; 

app.use(errorHandler);

const port = process.env.PORT || '8000';
app.set('port', port);

const server = http.createServer(app);

function onError(error: { syscall: string; code: string }) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      process.exit(1);
      break;
    case 'EADDRINUSE':
      process.exit(1);
      break;
    default:
      throw error;
  }
}

function onListening() {
  const addr = server.address();
  const bind = typeof addr === 'string' ? `pipe ${addr}` : `port ${addr?.port}`;
  console.info(`Server is listening on ${bind}`);
}

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);
