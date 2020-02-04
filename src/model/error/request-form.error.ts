import { BadRequestError } from 'routing-controllers';
import { ValidationError } from 'class-validator';

export class RequestFormError extends BadRequestError {
  public errors: ValidationError[] = [];

  public paramName: string = '';

  constructor(message: string) {
    super(message);
  }
}
