import qs, { IStringifyOptions } from 'qs'

export const stringify = (obj: Record<string, unknown>, options?: IStringifyOptions | undefined): string => {
  return qs.stringify(obj, { skipNulls: true, arrayFormat: 'repeat', ...options })
}