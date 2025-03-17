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
      return 'String';
  }
}
