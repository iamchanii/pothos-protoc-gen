import type { DescMessage } from '@bufbuild/protobuf';
import type { Schema } from '@bufbuild/protoplugin';
import { getGeneratedFile } from '../helpers/generated-file.ts';
import { getDescriptorComments } from '../helpers/get-descriptor-comments.ts';
import { getDescriptorName } from '../helpers/get-descriptor-name.ts';
import type { PluginOptions } from '../plugin-options.ts';

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
    const fieldType = 'String';
    const resolveExpression = '() => null';

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
