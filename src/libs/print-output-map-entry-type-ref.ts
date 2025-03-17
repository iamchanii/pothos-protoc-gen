import type { DescField, DescMessage } from '@bufbuild/protobuf';
import type { GeneratedFile } from '@bufbuild/protoplugin';
import { pascalCase } from 'change-case';
import { getDescriptorName } from './get-descriptor-name.js';
import { mapProtoToGraphQLScalar } from './get-field-type.js';
import { importBuilder } from './import-builder.js';

export function getOutputMapEntryTypeName(entry: {
  message: DescMessage;
  field: DescField;
}) {
  const messageName = getDescriptorName(entry.message);
  const fieldName = pascalCase(entry.field.localName);
  const entryTypeName = `${messageName}_${fieldName}MapEntry`;

  return entryTypeName;
}

export function printOutputMapEntryTypeRef(
  f: GeneratedFile,
  entry: { message: DescMessage; field: DescField },
) {
  const entryTypeName = getOutputMapEntryTypeName(entry);
  const valueType = getValueType();

  f.print(f.jsDoc(entry.field));
  f.print`${f.export('const', `${entryTypeName}Ref`)} = ${importBuilder(f)}.objectRef('${entryTypeName}').implement({`;
  f.print`  fields: t => ({`;
  f.print`    key: t.exposeString('key', { nullable: false }),`;
  f.print`    value: t.expose('value', { type: '${valueType}', nullable: false }),`;
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
        return getDescriptorName(entry.field.message);
    }
  }
}
