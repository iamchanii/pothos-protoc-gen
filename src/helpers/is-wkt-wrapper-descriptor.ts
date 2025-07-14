import type { AnyDesc } from '@bufbuild/protobuf';
import type { WktWrapperDesc } from '@bufbuild/protobuf/wkt';

/**
 * Determines if a descriptor represents a Google Protocol Buffers Well-Known Type (WKT) wrapper.
 *
 * @param descriptor - The descriptor to check
 * @returns Whether the descriptor is a WKT wrapper
 * @remarks This function identifies WKT wrappers by checking if they are message descriptors
 * and if their type name includes "google.protobuf"
 */
export function isWktWrapperDescriptor(
  descriptor: AnyDesc,
): descriptor is WktWrapperDesc {
  return (
    descriptor.kind === 'message' &&
    descriptor.typeName !== 'google.protobuf.Value' &&
    descriptor.typeName !== 'google.protobuf.ListValue' &&
    /google.protobuf.*Value$/.test(descriptor.typeName)
  );
}
