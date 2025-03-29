import type { DescField, DescMessage } from '@bufbuild/protobuf';
import type { GeneratedFile } from '@bufbuild/protoplugin';
import { pascalCase } from 'change-case';
import { getDescriptorName } from './get-descriptor-name.js';
import { mapProtoToGraphQLScalar } from './get-field-type.js';
import { importBuilder } from './import-builder.js';

export function getInputMapEntryTypeName(entry: {
  message: DescMessage;
  field: DescField;
}) {
  const messageName = getDescriptorName(entry.message);
  const fieldName = pascalCase(entry.field.localName);
  const entryTypeName = `${messageName}_${fieldName}MapEntryInput`;

  return entryTypeName;
}

export function printInputMapEntryTypeRef(
  f: GeneratedFile,
  entry: { message: DescMessage; field: DescField },
) {
  const entryTypeName = getInputMapEntryTypeName(entry);
  const valueType = getValueType();

  f.print(f.jsDoc(entry.field));
  f.print`${f.export('const', `${entryTypeName}Ref`)} = ${importBuilder(f)}.inputRef('${entryTypeName}').implement({`;
  f.print`  fields: t => ({`;
  f.print`    key: t.string({ required: true }),`;
  f.print`    value: t.field({ type: '${valueType}', required: true }),`;
  f.print`  }),`;
  f.print`});`;
  f.print();

  function getValueType() {
    if (entry.field.fieldKind !== 'map') throw 'unreachable';

    switch (entry.field.mapKind) {
      case 'scalar':
        return mapProtoToGraphQLScalar(entry.field.scalar);
      case 'enum':
        return getDescriptorName(entry.field.enum);
      case 'message':
        return getDescriptorName(entry.field.message, 'Input');
    }
  }
}
