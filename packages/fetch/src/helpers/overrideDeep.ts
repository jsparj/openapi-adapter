import { DeepPartial } from 'src/types/utility';
import {isObject} from './isObject'

export function overrideDeep<T extends object>(target: T, ...sources: DeepPartial<T>[]): T {
  if (!sources.length) return target;
  const _target: Record<string,any> = { ...target }
  const source = sources.shift();

  for (const key in source) {
    if (isObject(source[key])) {
      _target[key] = overrideDeep(_target[key], source[key]);
    } else {
      _target[key] = source[key];
    }
  }

  return overrideDeep(_target, ...sources) as T;
}

