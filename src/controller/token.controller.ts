import {
  JsonController,
  Param,
  Body,
  Get,
  Post,
  Put,
  Delete,
} from 'routing-controllers';
import { LoginModel } from '../model/request/login.model';

@JsonController()
export class TokenController {
  @Post('/token')
  createToken(@Body() login: LoginModel) {
    return login;
  }
}
