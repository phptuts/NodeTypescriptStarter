import {
  Middleware,
  ExpressErrorMiddlewareInterface,
  BadRequestError,
} from 'routing-controllers';
import { ValidationError } from 'class-validator';
import express from 'express';
import { createResponse, ResponseTypes } from '../model/response.model';
import { RequestFormError } from '../model/error/request-form.error';

@Middleware({ type: 'after' })
export class BadRequestMiddleware implements ExpressErrorMiddlewareInterface {
  error(
    error: any | BadRequestError,
    request: any,
    response: any | express.Response,
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

    console.log('got here for real');

    console.log('hello world', typeof error, 'error');
    next();
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
