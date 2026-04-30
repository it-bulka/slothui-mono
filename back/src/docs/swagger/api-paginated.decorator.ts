import { applyDecorators, Type } from '@nestjs/common';
import { ApiExtraModels, ApiOkResponse, getSchemaPath } from '@nestjs/swagger';

export const ApiPaginatedResponse = <T>(model: Type<T>) =>
  applyDecorators(
    ApiExtraModels(model),
    ApiOkResponse({
      schema: {
        type: 'object',
        properties: {
          items: {
            type: 'array',
            items: { $ref: getSchemaPath(model) },
          },
          nextCursor: {
            type: 'string',
            nullable: true,
            example: 'eyJpZCI6IjEyMyJ9',
          },
        },
      },
    }),
  );
