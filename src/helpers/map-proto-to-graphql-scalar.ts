import { ScalarType } from '@bufbuild/protobuf';

/**
 * Maps Protocol Buffer scalar types to GraphQL scalar types.
 *
 * @param protoScalar - The Protocol Buffer scalar type to be mapped
 * @returns The corresponding GraphQL scalar type name
 *
 * @remarks
 * This function converts Protocol Buffer scalar types to their GraphQL equivalents:
 * - DOUBLE and FLOAT are mapped to 'Float'
 * - INT32, UINT32, SINT32, FIXED32, and SFIXED32 are mapped to 'Int'
 * - INT64, UINT64, SINT64, FIXED64, and SFIXED64 are mapped to 'String' (since GraphQL Int cannot represent 64-bit integers)
 * - BOOL is mapped to 'Boolean'
 * - STRING is mapped to 'String'
 * - Unrecognized or undefined types default to 'String' with an error logged for unrecognized types
 */
export function mapProtoToGraphQLScalar(
  protoScalar: ScalarType | undefined,
): string {
  switch (protoScalar) {
    case ScalarType.DOUBLE:
    case ScalarType.FLOAT:
      return 'Float';

    case ScalarType.INT32:
    case ScalarType.UINT32:
    case ScalarType.SINT32:
    case ScalarType.FIXED32:
    case ScalarType.SFIXED32:
      return 'Int';

    case ScalarType.INT64:
    case ScalarType.UINT64:
    case ScalarType.SINT64:
    case ScalarType.FIXED64:
    case ScalarType.SFIXED64:
      return 'String';

    case ScalarType.BOOL:
      return 'Boolean';

    case ScalarType.STRING:
      return 'String';

    default:
      if (protoScalar)
        console.error(
          `Currently not supported proto scalar type: ${ScalarType[protoScalar]}`,
        );

      return 'String';
  }
}
