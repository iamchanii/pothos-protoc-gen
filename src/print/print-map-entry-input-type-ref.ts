import { ScalarType } from '@bufbuild/protobuf';
import type { Schema } from '@bufbuild/protoplugin';
import type { MapEntry } from '../collect/types.js';
import {
  getGeneratedFile,
  getPothosMapEntriesGeneratedFile,
} from '../helpers/generated-file.js';
import { getDescriptorName } from '../helpers/get-descriptor-name.js';
import { getInputMapEntryTypeName } from '../helpers/get-map-entry-type-name.js';
import { mapProtoToGraphQLScalar } from '../helpers/map-proto-to-graphql-scalar.js';
import { mapProtoToPrimitiveType } from '../helpers/map-proto-to-primitive-type.js';
import type { PluginOptions } from '../plugin-options.js';

/**
 * Generates a Pothos input ref for a map entry field.
 *
 * This function creates an input reference type that represents a key-value pair
 * for a map field in a Protocol Buffer schema. It handles both object descriptors
 * and primitive types for the map value.
 *
 * @param schema - The schema containing plugin options and configuration.
 * @param mapEntry - The map entry information containing field and descriptor details.
 * @returns Nothing; the function prints the generated code to the appropriate file.
 *
 * @remarks
 * The generated input type will have two fields:
 * - `key`: A required string field
 * - `value`: A required field of the appropriate type based on the descriptor
 *
 * The function determines the correct import path and type name based on whether
 * the descriptor is an object or a primitive type.
 */
function printMapEntryInputTypeRef(
  schema: Schema<PluginOptions>,
  mapEntry: MapEntry,
) {
  const f =
    typeof mapEntry.descriptor === 'object'
      ? getGeneratedFile(schema, mapEntry.descriptor.file)
      : getPothosMapEntriesGeneratedFile(schema);
  const typeName = getInputMapEntryTypeName(mapEntry.field);
  const refName = `${typeName}Ref`;
  const description = `Key-value pair for the map field ${mapEntry.field.localName} of ${typeof mapEntry.descriptor === 'object' ? mapEntry.descriptor.typeName : ScalarType[mapEntry.descriptor]}.`;
  const shapeValueType =
    typeof mapEntry.descriptor === 'object'
      ? f.importShape(mapEntry.descriptor)
      : mapProtoToPrimitiveType(mapEntry.descriptor);
  const valueType =
    typeof mapEntry.descriptor === 'object'
      ? getDescriptorName(mapEntry.descriptor, 'Input')
      : mapProtoToGraphQLScalar(mapEntry.descriptor);

  f.print(f.jsDoc(mapEntry.field));
  f.print`${f.export('const', refName)} = ${f.importPothosBuilder}.inputRef<{ key: string; value: ${shapeValueType} }>('${typeName}').implement({`;
  f.print`  description: ${JSON.stringify(description)},`;
  f.print`  fields: t => ({`;
  f.print`    key: t.string({ required: true }),`;
  f.print`    value: t.field({ type: '${valueType}', required: true }),`;
  f.print`  }),`;
  f.print`});`;
  f.print();
}

export function createPrintMapEntryInputTypeRef(schema: Schema<PluginOptions>) {
  return (mapEntry: MapEntry) => {
    printMapEntryInputTypeRef(schema, mapEntry);
  };
}
