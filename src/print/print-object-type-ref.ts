import type { DescMessage } from '@bufbuild/protobuf';
import type { Schema } from '@bufbuild/protoplugin';
import { getGeneratedFile } from '../helpers/generated-file.js';
import { getDescriptorComments } from '../helpers/get-descriptor-comments.js';
import { getDescriptorName } from '../helpers/get-descriptor-name.js';
import { getObjectFieldType } from '../helpers/get-field-type.js';
import { getObjectFieldResolverExpression } from '../helpers/get-object-field-resolver-expression.js';
import type { PluginOptions } from '../plugin-options.js';

/**
 * Prints a GraphQL object type reference for a given protocol buffer message descriptor.
 *
 * This function generates the necessary code to define a Pothos GraphQL object type reference
 * that corresponds to a protocol buffer message type. It creates a constant that implements
 * the object type with fields that match the protocol buffer message fields.
 *
 * @param schema - The schema containing plugin options for code generation
 * @param message - The protocol buffer message descriptor to generate a GraphQL type for
 *
 * @remarks
 * The function performs the following:
 * - Gets the appropriate file for code generation
 * - Creates a GraphQL object type reference with the message name
 * - Adds description from the message comments
 * - Adds a placeholder field named '_' (GraphQL doesn't support empty objects)
 * - Adds all fields from the message with their types, descriptions, and resolvers
 * - Handles deprecation markers
 *
 * The generated code uses the Pothos GraphQL schema builder pattern.
 */
function printObjectTypeRef(
  schema: Schema<PluginOptions>,
  message: DescMessage,
) {
  const f = getGeneratedFile(schema, message.file);
  const messageName = getDescriptorName(message);
  const messageTypeRefName = `${messageName}Ref`;

  f.print(f.jsDoc(message));
  f.print`${f.export('const', messageTypeRefName)} = ${f.importBuilder}.objectRef<${f.importShape(message)}>('${messageName}').implement({`;
  f.print`  description: ${JSON.stringify(getDescriptorComments(message))},`;
  f.print`  fields: t => ({`;
  f.print`    _: t.boolean({ resolve: () => false, description: 'Fake field because GraphQL does not support empty objects. Do not query, use __typename instead.' }),`;

  for (const field of message.fields) {
    const indent = '    '; // 4 spaces
    const fieldType = getObjectFieldType(field);
    const resolveExpression = getObjectFieldResolverExpression(f, field);

    f.print(f.jsDoc(field, indent));
    f.print`${indent}${field.localName}: t.field({`;
    f.print`${indent}  type: ${JSON.stringify(fieldType)},`;
    f.print`${indent}  description: ${JSON.stringify(getDescriptorComments(message))},`;
    f.print`${indent}  deprecatedReason: ${JSON.stringify(message.deprecated ? 'Deprecated' : '')},`;
    f.print`${indent}  resolve: ${resolveExpression},`;
    f.print`${indent}}),`;
  }

  f.print`  }),`;
  f.print`});`;
  f.print();
}

export function createPrintObjectTypeRef(schema: Schema<PluginOptions>) {
  return (message: DescMessage) => {
    return printObjectTypeRef(schema, message);
  };
}
