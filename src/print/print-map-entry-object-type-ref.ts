import { ScalarType } from '@bufbuild/protobuf';
import type { Schema } from '@bufbuild/protoplugin';
import type { MapEntry } from '../collect/types.js';
import {
  getGeneratedFile,
  getPothosMapEntriesGeneratedFile,
} from '../helpers/generated-file.js';
import { getDescriptorName } from '../helpers/get-descriptor-name.js';
import { getOutputMapEntryTypeName } from '../helpers/get-map-entry-type-name.js';
import { mapProtoToGraphQLScalar } from '../helpers/map-proto-to-graphql-scalar.js';
import { mapProtoToPrimitiveType } from '../helpers/map-proto-to-primitive-type.js';
import type { PluginOptions } from '../plugin-options.js';

/**
 * Prints a Pothos Object Type Reference for a map entry.
 *
 * @param schema - The schema with plugin options
 * @param mapEntry - The map entry object containing field and descriptor information
 * @returns Nothing, but prints code for creating an object type reference for the map entry
 *
 * @remarks
 * This function generates code to create a Pothos object reference for representing
 * key-value pairs in map fields. It handles both primitive type values and complex
 * object type values. The generated object type will have two fields:
 * - `key`: Always a string type
 * - `value`: Either a scalar type or a referenced object type
 *
 * The function also includes appropriate imports, exports, and descriptions
 * based on the map entry's field information.
 */
function printMapEntryObjectTypeRef(
  schema: Schema<PluginOptions>,
  mapEntry: MapEntry,
) {
  const f =
    typeof mapEntry.descriptor === 'object'
      ? getGeneratedFile(schema, mapEntry.descriptor.file)
      : getPothosMapEntriesGeneratedFile(schema);
  const typeName = getOutputMapEntryTypeName(mapEntry.field);
  const refName = `${typeName}Ref`;
  const description = `Key-value pair for the map field ${mapEntry.field.localName} of ${typeof mapEntry.descriptor === 'object' ? mapEntry.descriptor.typeName : ScalarType[mapEntry.descriptor]}.`;
  const shapeValueType =
    typeof mapEntry.descriptor === 'object'
      ? f.importShape(mapEntry.descriptor)
      : mapProtoToPrimitiveType(mapEntry.descriptor);
  const valueType =
    typeof mapEntry.descriptor === 'object'
      ? getDescriptorName(mapEntry.descriptor)
      : mapProtoToGraphQLScalar(mapEntry.descriptor);

  f.print(f.jsDoc(mapEntry.field));
  f.print`${f.export('const', refName)} = ${f.importPothosBuilder}.objectRef<{ key: string; value: ${shapeValueType} }>('${typeName}').implement({`;
  f.print`  description: ${JSON.stringify(description)},`;
  f.print`  fields: t => ({`;
  f.print`    key: t.exposeString('key', { nullable: false }),`;
  f.print`    value: t.expose('value', { type: '${valueType}', nullable: false }),`;
  f.print`  }),`;
  f.print`});`;
  f.print();
}

export function createPrintMapEntryObjectTypeRef(
  schema: Schema<PluginOptions>,
) {
  return (mapEntry: MapEntry) => {
    printMapEntryObjectTypeRef(schema, mapEntry);
  };
}
