import type { DescEnum, DescMessage } from '@bufbuild/protobuf';
import { pascalCase } from 'change-case';

/**
 * Generates a descriptor name based on the provided descriptor and optional suffix.
 *
 * @param descriptor - The descriptor object (either DescMessage or DescEnum) for which to generate a name
 * @param suffix - Optional suffix to append to the generated name (defaults to empty string)
 * @returns A formatted string representing the descriptor name
 * @remarks
 * If the descriptor has a parent, the returned name will be in the format:
 * `{PascalCasedParentTypeName}_{PascalCasedDescriptorName}{suffix}`.
 * Otherwise, it will simply be `{PascalCasedDescriptorTypeName}{suffix}`.
 */
export function getDescriptorName(
  descriptor: DescMessage | DescEnum,
  suffix = '',
): string {
  if (descriptor.parent) {
    return `${pascalCase(descriptor.parent.typeName)}_${pascalCase(descriptor.name)}${suffix}`;
  }

  return `${pascalCase(descriptor.typeName)}${suffix}`;
}
