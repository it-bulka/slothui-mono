import { applyDecorators, UsePipes, ValidationPipe } from '@nestjs/common';
import { WsException } from '@nestjs/websockets';

export function ValidateDtoPipe() {
  return applyDecorators(
    UsePipes(
      new ValidationPipe({
        whitelist: true,
        transform: true,
        exceptionFactory: (errors) => {
          const simplified = errors.map((err) => ({
            field: err.property,
            messages: err.constraints ? Object.values(err.constraints) : [],
          }));
          return new WsException({
            message: 'Validation failed.',
            errors: simplified,
          });
        },
      }),
    ),
  );
}
