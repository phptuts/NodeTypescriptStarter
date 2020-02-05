import {
  Middleware,
  ExpressErrorMiddlewareInterface,
  BadRequestError,
  UnauthorizedError,
  ForbiddenError,
  MethodNotAllowedError,
} from 'routing-controllers';
import { ValidationError } from 'class-validator';
import express from 'express';
import { createResponse, ResponseTypes } from '../model/response.model';
import { RequestFormError } from '../model/error/request-form.error';

@Middleware({ type: 'after' })
export class BadRequestMiddleware implements ExpressErrorMiddlewareInterface {
  error(
    error: any,
    request: express.Request,
    response: express.Response,
    next: (err?: any) => any
  ): void {
    if (error instanceof BadRequestError && (<RequestFormError>error).errors) {
      const formErrors = flattenValidationErrors(
        (<RequestFormError>error).errors
      );
      response
        .status(error.httpCode)
        .send(createResponse(formErrors, ResponseTypes.FORM_ERRORS));
      return;
    }

    if (error instanceof UnauthorizedError) {
      response.status(error.httpCode).send(
        createResponse(
          {
            message: 'Login Required',
          },
          ResponseTypes.ACCESS_DENIED
        )
      );
      return;
    }

    if (error instanceof ForbiddenError) {
      response.status(error.httpCode).send(
        createResponse(
          {
            message: 'You are not allowed to view this page.',
          },
          ResponseTypes.ACCESS_DENIED
        )
      );
      return;
    }

    if (error instanceof MethodNotAllowedError) {
      response.status(error.httpCode).send(
        createResponse(
          {
            method: request.method,
            url: request.url,
            message: 'The Http Method does not exist on this url',
          },
          ResponseTypes.NOT_FOUND
        )
      );
      return;
    }

    const bugId = `BUG-${new Date().getTime()}-${Math.floor(
      Math.random() * 50000
    )}`;

    console.error(...error);
    response.status(error.httpCode).send(
      createResponse(
        {
          bugId,
          supportEmail: process.env.EMAIL,
        },
        ResponseTypes.ERROR_500
      )
    );
  }
}

const flattenValidationErrors = (
  errors: ValidationError[],
  parentName = ''
) => {
  const formErrors: Array<FormError> = [];
  errors.forEach((validationError) => {
    const prependParentName = parentName !== '' ? parentName + '_' : '';

    if (validationError.constraints) {
      formErrors.push({
        field_name: prependParentName + validationError.property,
        value: validationError.value,
        error_messages: validationError.constraints,
      });
    }

    if (validationError.children.length > 0) {
      formErrors.push(
        ...flattenValidationErrors(
          validationError.children,
          prependParentName + validationError.property
        )
      );
    }
  });

  return formErrors;
};

interface FormError {
  field_name: string;
  value: string | object;
  error_messages: { [key: string]: string };
}
