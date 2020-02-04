import { IsEmail, Length } from 'class-validator';
import { Expose } from 'class-transformer';

export class LoginModel {
  
  @IsEmail()
  @Expose()
  public email: string;

  @Length(5, 30)
  @Expose()
  public password: string;
}
