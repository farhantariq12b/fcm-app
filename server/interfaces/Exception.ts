export type Meta = {
  reportError?: true
}

export type Exception = {
  message: string;
  code: number;
  meta: Meta;
  reportError?: boolean
}