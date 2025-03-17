import { type AnyDesc, toJson } from '@bufbuild/protobuf';
import {
  EnumOptionsSchema,
  EnumValueOptionsSchema,
  FieldOptionsSchema,
  FileOptionsSchema,
  MessageOptionsSchema,
  MethodOptionsSchema,
  OneofOptionsSchema,
  ServiceOptionsSchema,
} from '@bufbuild/protobuf/wkt';
import { storage } from './store.js';

interface KnownDesriptorProtoOptions {
  '[validate.rules]'?: {
    message?: { required?: boolean };
    // TODO: 추후 다룰 수 있는 규칙들 관리하기
    //       https://github.com/bufbuild/protoc-gen-validate/blob/main/validate/validate.proto
    // string?: { minLen?: string; maxLen?: string };
    // repeated?: { minItems?: string; maxItems?: string };
  };
}

export function parseDescriptorProtoOptions(
  descriptor: AnyDesc,
  { registry } = storage.getStore()!,
): null | KnownDesriptorProtoOptions {
  let schema:
    | typeof MethodOptionsSchema
    | typeof ServiceOptionsSchema
    | typeof OneofOptionsSchema
    | typeof FieldOptionsSchema
    | typeof MessageOptionsSchema
    | typeof EnumValueOptionsSchema
    | typeof EnumOptionsSchema
    | typeof FileOptionsSchema;

  if (!descriptor.proto.options) {
    return null;
  }

  switch (descriptor.proto.options.$typeName) {
    case 'google.protobuf.MethodOptions':
      schema = MethodOptionsSchema;
      break;
    case 'google.protobuf.ServiceOptions':
      schema = ServiceOptionsSchema;
      break;
    case 'google.protobuf.OneofOptions':
      schema = OneofOptionsSchema;
      break;
    case 'google.protobuf.FieldOptions':
      schema = FieldOptionsSchema;
      break;
    case 'google.protobuf.MessageOptions':
      schema = MessageOptionsSchema;
      break;
    case 'google.protobuf.EnumValueOptions':
      schema = EnumValueOptionsSchema;
      break;
    case 'google.protobuf.EnumOptions':
      schema = EnumOptionsSchema;
      break;
    case 'google.protobuf.FileOptions':
      schema = FileOptionsSchema;
      break;
  }

  const result = toJson(schema, descriptor.proto.options, { registry });

  if (typeof result === 'string') {
    return JSON.parse(result) as KnownDesriptorProtoOptions;
  }

  if (typeof result === 'object') {
    return result as KnownDesriptorProtoOptions;
  }

  return null;
}
