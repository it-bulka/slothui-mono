import { BadRequestException } from '@nestjs/common';
import { plainToInstance, ClassConstructor } from 'class-transformer';
import { validateSync } from 'class-validator';

export function parseAndValidate<T>(
  value: unknown,
  dto: ClassConstructor<T>,
  fieldName: string,
): T {
  let parsed = value;

  if (typeof parsed === 'string') {
    try {
      parsed = JSON.parse(parsed);
    } catch {
      throw new BadRequestException(`Invalid ${fieldName} JSON`);
    }
  }

  const obj = plainToInstance(dto, parsed);
  const errors = validateSync(obj as object, { whitelist: true });

  if (errors.length) {
    throw new BadRequestException(errors);
  }

  return obj;
}
