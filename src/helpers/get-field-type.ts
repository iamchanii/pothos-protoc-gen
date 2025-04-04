import type { DescField } from '@bufbuild/protobuf';
import { getDescriptorName } from './get-descriptor-name.js';
import {
  getInputMapEntryTypeName,
  getOutputMapEntryTypeName,
  getScalarMapEntryInputTypeName,
  getScalarMapEntryOutputTypeName,
} from './get-map-entry-type-name.js';
import { isWktWrapperDescriptor } from './is-wkt-wrapper-descriptor.js';
import { mapProtoToGraphQLScalar } from './map-proto-to-graphql-scalar.js';
import { mapWktMessageToGraphQLScalar } from './map-wkt-message-to-graphql-scalar.js';
import { mapWktMessageToProtoScalar } from './map-wkt-message-to-proto-scalar.js';

/**
 * Determines the GraphQL type for a given field descriptor based on its kind.
 *
 * @param field - The field descriptor containing type information
 * @param type - Whether this field is for an input or object type
 * @returns The appropriate GraphQL type representation
 * @remarks
 * This function handles different field kinds:
 * - For scalar fields, it maps to the corresponding GraphQL scalar
 * - For enum fields, it returns the enum descriptor name
 * - For message fields, it returns either a mapped scalar (for WKT wrappers) or the message name
 * - For list fields, it returns an array of the corresponding type
 * - For map fields, it returns the appropriate map entry type
 *
 * When type is 'input', message fields will have 'Input' appended to their names and
 * different map entry type functions are used.
 */
function getFieldType(field: DescField, type: 'input' | 'object') {
  const getScalarMapEntryTypeName =
    type === 'input'
      ? getScalarMapEntryInputTypeName
      : getScalarMapEntryOutputTypeName;

  const getMapEntryTypeName =
    type === 'input' ? getInputMapEntryTypeName : getOutputMapEntryTypeName;

  switch (field.fieldKind) {
    case 'scalar':
      return mapProtoToGraphQLScalar(field.scalar);

    case 'enum':
      return getDescriptorName(field.enum);

    case 'message':
      return isWktWrapperDescriptor(field.message)
        ? mapWktMessageToGraphQLScalar(field.message)
        : getDescriptorName(
            field.message,
            type === 'input' ? 'Input' : undefined,
          );

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
              : getDescriptorName(
                  field.message,
                  type === 'input' ? 'Input' : undefined,
                ),
          ];
        default:
          throw new Error('Unreachable code');
      }

    case 'map':
      switch (field.mapKind) {
        case 'scalar':
          return [getScalarMapEntryTypeName(field.scalar)];
        case 'message': {
          if (isWktWrapperDescriptor(field.message)) {
            return [
              getScalarMapEntryTypeName(
                mapWktMessageToProtoScalar(field.message),
              ),
            ];
          }

          return [getMapEntryTypeName(field)];
        }
        case 'enum':
          return [getMapEntryTypeName(field)];
        default:
          throw new Error('Unreachable code');
      }
  }
}

/**
 * Retrieves the field type for an object based on the provided description field.
 *
 * @param field - The description field to extract type information from
 * @returns The field type designated for object representation
 * @remarks This is a specialized version of getFieldType that specifically handles object types
 */
export function getObjectFieldType(field: DescField) {
  return getFieldType(field, 'object');
}

/**
 * Retrieves the input field type for a given descriptor field
 *
 * @param field - The descriptor field to get the input type for
 * @returns The field type appropriate for input usage
 * @remarks This is a wrapper around the getFieldType function that specifically targets input field types
 */
export function getInputFieldType(field: DescField) {
  return getFieldType(field, 'input');
}
