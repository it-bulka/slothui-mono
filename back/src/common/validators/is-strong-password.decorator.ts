import { applyDecorators } from '@nestjs/common';
import { Matches, MaxLength, MinLength, IsString } from 'class-validator';

export function IsStrongPassword() {
  return applyDecorators(
    IsString(),
    MinLength(6, { message: 'Password is too short (min 6)' }),
    MaxLength(30, { message: 'Password is too long (max 30)' }),
    Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).+$/, {
      message:
        'Password must contain uppercase, lowercase, special character and no spaces',
    }),
  );
}
