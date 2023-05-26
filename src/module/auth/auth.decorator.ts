import { SetMetadata } from '@nestjs/common';
import { AuthType } from 'src/common/enum';

export const AUTH_KEY = 'auth';
export const Auth = (type: AuthType[] | AuthType) =>
  SetMetadata(AUTH_KEY, type);
