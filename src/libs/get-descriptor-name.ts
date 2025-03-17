import type { DescEnum, DescMessage } from '@bufbuild/protobuf';
import { pascalCase } from 'change-case';

export function getDescriptorName(
  descriptor: DescMessage | DescEnum,
  suffix = '',
): string {
  if (descriptor.parent) {
    return `${pascalCase(descriptor.parent.typeName)}_${pascalCase(descriptor.name)}${suffix}`;
  }

  return `${pascalCase(descriptor.typeName)}${suffix}`;
}
