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
