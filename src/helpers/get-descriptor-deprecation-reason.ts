import type { AnyDesc } from '@bufbuild/protobuf';

/**
 * Extracts and formats the deprecated status from a descriptor.
 *
 * @param descriptor - The descriptor to extract the deprecated status from
 * @returns A string representing the deprecated status. If the descriptor is deprecated,
 * returns the stringified deprecated value, otherwise returns 'undefined'
 * @remarks This function is used in code generation to determine if a field or message
 * should be marked as deprecated in the generated code.
 */
export function getDescriptorDeprecationReason(descriptor: AnyDesc) {
  return descriptor.deprecated
    ? JSON.stringify('Deprecated. See the comments for more details.')
    : 'undefined';
}
