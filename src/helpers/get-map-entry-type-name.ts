import { type DescField, ScalarType } from '@bufbuild/protobuf';
import { pascalCase } from 'change-case';
import { getDescriptorName } from './get-descriptor-name.js';
import { mapProtoToGraphQLScalar } from './map-proto-to-graphql-scalar.js';

/**
 * Generates a type name for map entry outputs based on field descriptor information.
 *
 * @param field - The descriptor field for which to generate the map entry type name
 * @returns A string representing the generated map entry type name
 *
 * @remarks
 * This function creates a map entry type name based on the field's type:
 * - For scalar fields: Uses the mapped GraphQL scalar type name and appends "MapEntry"
 * - For message/enum fields: Combines the descriptor name with the field's local name in
 *   PascalCase, joined with an underscore and suffixed with "MapEntry"
 */
export function getOutputMapEntryTypeName(field: DescField) {
  const descriptorName = field.scalar
    ? mapProtoToGraphQLScalar(field.scalar)
    : getDescriptorName(field.message || field.enum);

  const fieldName = pascalCase(field.localName);

  return field.scalar
    ? `${descriptorName}MapEntry`
    : `${descriptorName}_${fieldName}MapEntry`;
}

export function getInputMapEntryTypeName(field: DescField) {
  return `${getOutputMapEntryTypeName(field)}Input`;
}

/**
 * Generates an output type name for a map entry based on a scalar type.
 *
 * @param scalarType - The scalar type for which to generate a map entry output type name
 * @returns The generated map entry output type name
 *
 * @remarks
 * This function converts the scalar type to Pascal case and appends "MapEntry" to create
 * a type name suitable for map entries containing scalar values.
 */
export function getScalarMapEntryOutputTypeName(scalarType: ScalarType) {
  const scalarName = pascalCase(ScalarType[scalarType]);
  return `${scalarName}MapEntry`;
}

export function getScalarMapEntryInputTypeName(scalarType: ScalarType) {
  return `${getScalarMapEntryOutputTypeName(scalarType)}Input`;
}
