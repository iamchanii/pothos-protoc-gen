import {
  BoolValueSchema,
  DoubleValueSchema,
  FloatValueSchema,
  Int32ValueSchema,
  Int64ValueSchema,
  StringValueSchema,
  UInt32ValueSchema,
  UInt64ValueSchema,
  type WktWrapperDesc,
} from '@bufbuild/protobuf/wkt';

/**
 * Maps Well-Known Type (WKT) message descriptors to their corresponding GraphQL scalar types.
 *
 * @param descriptor - The WKT wrapper descriptor to be mapped to a GraphQL scalar
 * @returns The corresponding GraphQL scalar type name
 * @remarks
 * This function handles standard Protocol Buffer WKT wrapper types and converts them to
 * appropriate GraphQL scalar types. For unsupported WKT message types, it will log an error
 * and default to returning 'String'.
 */
export function mapWktMessageToGraphQLScalar(descriptor: WktWrapperDesc) {
  switch (descriptor.typeName) {
    case DoubleValueSchema.typeName:
    case FloatValueSchema.typeName:
      return 'Float';
    case Int32ValueSchema.typeName:
    case UInt32ValueSchema.typeName:
      return 'Int';
    case Int64ValueSchema.typeName:
    case UInt64ValueSchema.typeName:
      return 'String';
    case BoolValueSchema.typeName:
      return 'Boolean';
    case StringValueSchema.typeName:
      return 'String';
    default:
      console.error(
        `Currently not supported WKT message type: ${descriptor.typeName}`,
      );
      return 'String';
  }
}
