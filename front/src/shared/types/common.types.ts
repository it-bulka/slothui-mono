export type NonNullableFields<T> = Required<{ [K in keyof T]: NonNullable<T[K]> }>
