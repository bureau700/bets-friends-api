import { Matches, MinLength, MaxLength, IsNotEmpty } from 'class-validator';
import { validationRules } from '../../services/user-service/constants';

export class SignupRequest {
  @IsNotEmpty()
  @Matches(/^[^\s]+$/i)
  @MinLength(validationRules.username.minLength)
  @MaxLength(validationRules.username.maxLength)
  username: string | null = null;

  @IsNotEmpty()
  @MinLength(validationRules.password.minLength)
  @MaxLength(validationRules.password.maxLength)
  password: string | null = null;
}

// export type SignupRequest = Required<PartialSignupRequest>;
