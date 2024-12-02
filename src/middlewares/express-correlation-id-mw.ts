import correlator from '../logger/correlation-id';
import { NextFunction, Request, Response } from 'express';

function correlationIdMiddleware(req: Request, res: Response, next: NextFunction) {
  correlator.bindEmitter(req);
  correlator.bindEmitter(res);
  correlator.bindEmitter(req.socket);

  const correlationId = req.get('x-correlation-id') || '';  // Provide a default value

  correlator.withId(() => {
    const currentCorrelationId = correlator.getId();
    res.set('x-correlation-id', currentCorrelationId);
    next();
  }, correlationId);
}

export default correlationIdMiddleware;
