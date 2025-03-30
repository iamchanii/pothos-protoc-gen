import { ScalarType } from '@bufbuild/protobuf';

/**
 * Maps a Protocol Buffers scalar type to a TypeScript primitive type string.
 *
 * @param protoScalar - The Protocol Buffers scalar type to map
 * @returns The corresponding TypeScript primitive type as a string
 *
 * @remarks
 * - Numeric protobuf types (DOUBLE, FLOAT, INT32, etc.) are mapped to 'number'
 * - 64-bit integer types are mapped to 'string' to preserve precision
 * - BOOL is mapped to 'boolean'
 * - STRING is mapped to 'string'
 * - Unsupported scalar types will log an error and default to 'string'
 */
export function mapProtoToPrimitiveType(
  protoScalar: ScalarType | undefined,
): string {
  switch (protoScalar) {
    case ScalarType.DOUBLE:
    case ScalarType.FLOAT:
    case ScalarType.INT32:
    case ScalarType.UINT32:
    case ScalarType.SINT32:
    case ScalarType.FIXED32:
    case ScalarType.SFIXED32:
      return 'number';

    case ScalarType.INT64:
    case ScalarType.UINT64:
    case ScalarType.SINT64:
    case ScalarType.FIXED64:
    case ScalarType.SFIXED64:
      return 'string';

    case ScalarType.BOOL:
      return 'boolean';

    case ScalarType.STRING:
      return 'string';

    default:
      if (protoScalar)
        console.error(
          `Currently not supported proto scalar type: ${ScalarType[protoScalar]}`,
        );

      return 'string';
  }
}
