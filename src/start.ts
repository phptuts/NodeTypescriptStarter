import express from 'express';
import { connectdb } from './db/connect';
import 'reflect-metadata';

import dotevn from 'dotenv';

import { TokenController } from './controller/token.controller';
import { createExpressServer } from 'routing-controllers';
import { BadRequestMiddleware } from './middleware/bad_request.middleware';

dotevn.config();

const app = express();

app.get('/', (_, res) => {
  const b = 'blue';
  return res.send('rwerwe sdfsd ' + b);
});

const start = async () => {
  try {
    await connectdb();
    const app = createExpressServer({
      controllers: [TokenController], // we specify controllers we want to use
      middlewares: [BadRequestMiddleware],
      defaultErrorHandler: false,
      validation: {
        skipMissingProperties: false,
        skipNullProperties: false,
        skipUndefinedProperties: false,
      },
      classToPlainTransformOptions: {
        excludeExtraneousValues: true,
      },
    });

    // run express application on port 3000
    app.listen(3000);
  } catch (e) {
    console.error(e);
  }
};

start().then();
