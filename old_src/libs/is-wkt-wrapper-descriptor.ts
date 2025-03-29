import type { AnyDesc } from '@bufbuild/protobuf';
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

export function isWktWrapperDescriptor(
  descriptor: AnyDesc,
): descriptor is WktWrapperDesc {
  return (
    descriptor.kind === 'message' &&
    [
      DoubleValueSchema,
      FloatValueSchema,
      Int64ValueSchema,
      UInt64ValueSchema,
      Int32ValueSchema,
      UInt32ValueSchema,
      BoolValueSchema,
      StringValueSchema,
    ].some((schema) => schema.typeName === descriptor.typeName)
  );
}
