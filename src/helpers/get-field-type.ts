import { type DescField, ScalarType } from '@bufbuild/protobuf';
import {
  getScalarMapEntryInputTypeName,
  getScalarMapEntryOutputTypeName,
} from './generate-global-scalar-map-entries.js';
import { getDescriptorName } from './get-descriptor-name.js';
import { isWktWrapperDescriptor } from './is-wkt-wrapper-descriptor.js';
import { mapWktMessageToGraphQLScalar } from './map-wkt-message-to-graphql-scalar.js';
import { mapWktMessageToProtoScalar } from './map-wkt-message-to-proto-scalar.js';
import { getInputMapEntryTypeName } from './print-input-map-entry-type-ref.js';
import { getOutputMapEntryTypeName } from './print-output-map-entry-type-ref.js';

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

    // 불리언 타입
    case ScalarType.BOOL:
      return 'Boolean';

    // 문자열 타입
    case ScalarType.STRING:
      return 'String';

    // 바이너리 데이터
    case ScalarType.BYTES:
      return 'String'; // 또는 'Upload' 또는 'Bytes' 커스텀 스칼라 사용 가능

    // 미지원 또는 알 수 없는 타입
    default:
      return 'String'; // 기본값으로 String 사용
  }
}

export function getObjectFieldType(field: DescField) {
  if (field.localName === 'id') {
    return 'ID';
  }

  switch (field.fieldKind) {
    case 'scalar':
      return mapProtoToGraphQLScalar(field.scalar);
    case 'list':
      switch (field.listKind) {
        case 'scalar':
          return [mapProtoToGraphQLScalar(field.scalar)];
        case 'enum':
          return [getDescriptorName(field.enum)];
        case 'message':
          return [
            isWktWrapperDescriptor(field.message)
              ? mapWktMessageToGraphQLScalar(field.message)
              : getDescriptorName(field.message),
          ];
      }
      break;
    case 'map':
      switch (field.mapKind) {
        case 'scalar':
          return [getScalarMapEntryOutputTypeName(field.scalar)];
        case 'message':
          return [
            isWktWrapperDescriptor(field.message)
              ? getScalarMapEntryOutputTypeName(
                  mapWktMessageToProtoScalar(field.message),
                )
              : getOutputMapEntryTypeName({
                  field,
                  message: field.parent,
                }),
          ];

        case 'enum':
          return [
            getOutputMapEntryTypeName({
              field,
              message: field.parent,
            }),
          ];
      }
      break;
    case 'enum':
      return getDescriptorName(field.enum);
    case 'message':
      return isWktWrapperDescriptor(field.message)
        ? mapWktMessageToGraphQLScalar(field.message)
        : getDescriptorName(field.message);
  }
}

export function getInputFieldType(field: DescField) {
  if (field.localName === 'id') {
    return 'ID';
  }

  switch (field.fieldKind) {
    case 'scalar':
      return mapProtoToGraphQLScalar(field.scalar);
    case 'list':
      switch (field.listKind) {
        case 'scalar':
          return [mapProtoToGraphQLScalar(field.scalar)];
        case 'enum':
          return [getDescriptorName(field.enum)];
        case 'message':
          return [
            isWktWrapperDescriptor(field.message)
              ? mapWktMessageToGraphQLScalar(field.message)
              : getDescriptorName(field.message, 'Input'),
          ];
      }
      break;
    case 'map':
      switch (field.mapKind) {
        case 'scalar':
          return [getScalarMapEntryInputTypeName(field.scalar)];
        case 'message':
          return [
            isWktWrapperDescriptor(field.message)
              ? getScalarMapEntryInputTypeName(
                  mapWktMessageToProtoScalar(field.message),
                )
              : getInputMapEntryTypeName({
                  field,
                  message: field.parent,
                }),
          ];

        case 'enum':
          return [
            getInputMapEntryTypeName({
              field,
              message: field.parent,
            }),
          ];
      }
      break;
    case 'enum':
      return getDescriptorName(field.enum);
    case 'message':
      return isWktWrapperDescriptor(field.message)
        ? mapWktMessageToGraphQLScalar(field.message)
        : getDescriptorName(field.message, 'Input');
  }
}
