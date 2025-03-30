import type { DescMessage } from '@bufbuild/protobuf';
import type { Schema } from '@bufbuild/protoplugin';
import { getGeneratedFile } from '../helpers/generated-file.ts';
import { getDescriptorComments } from '../helpers/get-descriptor-comments.ts';
import { getDescriptorDeprecationReason } from '../helpers/get-descriptor-deprecation-reason.ts';
import { getDescriptorName } from '../helpers/get-descriptor-name.ts';
import { getInputFieldType } from '../helpers/get-field-type.ts';
import type { PluginOptions } from '../plugin-options.ts';

/**
 * Generates an input type reference for a Protocol Buffer message.
 * This function creates a TypeScript file exporting a Pothos GraphQL input type reference
 * based on the Protocol Buffer message definition.
 *
 * @param schema - The schema containing plugin options and configuration
 * @param message - The Protocol Buffer message descriptor
 *
 * @returns Nothing, but writes to the generated file
 *
 * @remarks
 * The function:
 * 1. Creates a TypeScript file for the input type reference
 * 2. Generates an input type with all fields from the message
 * 3. Adds a fake field '_' if the message has no fields (GraphQL doesn't support empty inputs)
 * 4. Preserves documentation from the original Protocol Buffer definition
 * 5. Exports the input type reference for use in Pothos GraphQL schema
 */
function printInputTypeRef(
  schema: Schema<PluginOptions>,
  message: DescMessage,
) {
  const f = getGeneratedFile(schema, message.file);
  const typeName = getDescriptorName(message, 'Input');
  const refName = `${typeName}Ref`;

  f.print(f.jsDoc(message));
  f.print`${f.export('const', refName)} = ${f.importPothosBuilder}.inputRef<${f.importShape(message)}>('${typeName}').implement({`;
  f.print`  description: ${getDescriptorComments(message)},`;
  f.print`  deprecationReason: ${getDescriptorDeprecationReason(message)},`;
  f.print`  fields: t => ({`;
  f.print`    _: t.boolean({ description: 'Fake field because GraphQL does not support empty input. Do not use, It does nothing.' }),`;

  for (const field of message.fields) {
    const indent = '    '; // 4 spaces
    const fieldType = getInputFieldType(field);

    f.print(f.jsDoc(field, indent));
    f.print`${indent}${field.localName}: t.field({`;
    f.print`${indent}  type: ${JSON.stringify(fieldType)},`;
    f.print`${indent}  description: ${getDescriptorComments(field)},`;
    f.print`${indent}  deprecationReason: ${getDescriptorDeprecationReason(field)},`;
    f.print`${indent}}),`;
  }

  f.print`  }),`;
  f.print`});`;
  f.print();
}

export function createPrintInputTypeRef(schema: Schema<PluginOptions>) {
  return (message: DescMessage) => {
    return printInputTypeRef(schema, message);
  };
}
