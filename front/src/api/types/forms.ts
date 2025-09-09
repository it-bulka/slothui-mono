import type { FieldValues, Path, UseFormRegister } from 'react-hook-form'

export interface IRegister<T extends FieldValues | undefined = undefined> {
  register?: T extends undefined ? undefined : UseFormRegister<Exclude<T, undefined>>
  name: T extends undefined ? string : Path<Exclude<T, undefined>>
}
