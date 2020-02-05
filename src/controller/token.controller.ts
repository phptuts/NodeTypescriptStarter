import {
  JsonController,
  Param,
  Body,
  Get,
  Post,
  Put,
  Delete,
  UnauthorizedError,
  ForbiddenError,
  MethodNotAllowedError,
} from 'routing-controllers';
import { LoginModel } from '../model/request/login.model';

@JsonController()
export class TokenController {
  @Post('/token')
  createToken(@Body() login: LoginModel) {
    return login;
  }

  @Get('/error')
  errorTest() {
    throw new MethodNotAllowedError('This should fail');
  }
}
