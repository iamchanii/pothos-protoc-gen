import { ScalarType } from '@bufbuild/protobuf';
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
 * Maps a Well-Known Type (WKT) wrapper message descriptor to the corresponding Protocol Buffer scalar type.
 *
 * @param descriptor - The WKT wrapper descriptor to be mapped to a scalar type
 * @returns The corresponding Protocol Buffer scalar type
 *
 * @remarks
 * This function handles various WKT wrapper types including Double, Float, Int32, UInt32,
 * Int64, UInt64, Bool, and String values. For Int64 and UInt64 values, the function
 * returns ScalarType.STRING since JavaScript cannot accurately represent 64-bit integers.
 * If an unrecognized type is provided, it defaults to ScalarType.STRING.
 */
export function mapWktMessageToProtoScalar(
  descriptor: WktWrapperDesc,
): ScalarType {
  switch (descriptor.typeName) {
    case DoubleValueSchema.typeName:
    case FloatValueSchema.typeName:
      return ScalarType.FLOAT;
    case Int32ValueSchema.typeName:
    case UInt32ValueSchema.typeName:
      return ScalarType.INT32;
    case Int64ValueSchema.typeName:
    case UInt64ValueSchema.typeName:
      return ScalarType.STRING;
    case BoolValueSchema.typeName:
      return ScalarType.BOOL;
    case StringValueSchema.typeName:
      return ScalarType.STRING;
    default:
      return ScalarType.STRING;
  }
}
