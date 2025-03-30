import type { DescMethod } from '@bufbuild/protobuf';
import { camelCase } from 'change-case';

export function getMethodFieldName(method: DescMethod) {
  return camelCase(`${method.parent.typeName}${method.name}`);
}
