import type { DescEnum } from '@bufbuild/protobuf';
import type { Schema } from '@bufbuild/protoplugin';
import { getGeneratedFile } from '../helpers/generated-file.ts';
import { getDescriptorComments } from '../helpers/get-descriptor-comments.ts';
import { getDescriptorName } from '../helpers/get-descriptor-name.ts';
import type { PluginOptions } from '../plugin-options.ts';

function printEnumTypeRef(schema: Schema<PluginOptions>, enum_: DescEnum) {
  const f = getGeneratedFile(schema, enum_.file);
  const enumName = getDescriptorName(enum_);
  const enumTypeRefName = `${enumName}Ref`;

  f.print(f.jsDoc(enum_));
  f.print`${f.export('const', enumTypeRefName)} = ${f.importBuilder}.enumType('${enumName}', {`;
  f.print`  description: ${JSON.stringify(getDescriptorComments(enum_))},`;
  f.print`  values: {`;

  for (const enumValue of enum_.values) {
    f.print(f.jsDoc(enumValue, '    '));
    f.print`    '${enumValue.localName}': {`;
    f.print`      value: ${f.runtimeImportEnumFromJson}(${f.importSchema(enum_)}, ${JSON.stringify(enumValue.name)}),`;
    f.print`      description: ${JSON.stringify(getDescriptorComments(enumValue))},`;
    f.print`      deprecated: ${JSON.stringify(enumValue.deprecated)},`;
    f.print`    },`;
  }

  f.print`  } as const,`;
  f.print`});`;
  f.print();
}

export function createPrintEnumTypeRef(schema: Schema<PluginOptions>) {
  return (enum_: DescEnum) => {
    return printEnumTypeRef(schema, enum_);
  };
}
