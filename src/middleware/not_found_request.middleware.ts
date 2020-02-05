import { ExpressMiddlewareInterface, Middleware } from 'routing-controllers';
import { NextFunction, Request, Response } from 'express';
import { createResponse, ResponseTypes } from '../model/response.model';

@Middleware({ type: 'after' })
export class NotFoundRequestMiddleWare implements ExpressMiddlewareInterface {
  public use(req: Request, res: Response, next?: NextFunction): void {
    if (!res.headersSent) {
      // TODO: match current url against every registered one
      // because finalhandler is reached if no value is returned in the controller.
      // so we need to set 404 only if really there are no path handling this.
      // or we just have to return with null?
      res.status(404);
      res.send(
        createResponse(
          {
            api_url: req.url,
          },
          ResponseTypes.NOT_FOUND
        )
      );
    }
    res.end();
  }
}
