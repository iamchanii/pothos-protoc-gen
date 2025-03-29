import type { DescEnum } from '@bufbuild/protobuf';
import type { GeneratedFile } from '@bufbuild/protoplugin';
import { addDeprecatedReasonField } from './add-deprecated-reason-field.js';
import { addDescriptionField } from './add-description-field.js';
import { getDescriptorName } from './get-descriptor-name.js';
import { importBuilder } from './import-builder.js';
import { importEnumFromJson } from './import-enum-from-json.js';
import { importSchemaFromProto } from './import-shape-from-proto.js';

export function printEnumTypeRef(f: GeneratedFile, enum_: DescEnum) {
  const enumName = getDescriptorName(enum_);

  f.print(f.jsDoc(enum_));
  f.print`${f.export('const', `${enumName}Ref`)} = ${importBuilder(f)}.enumType('${enumName}', {`;

  addDescriptionField(f, enum_, '  ');
  f.print`  values: {`;

  for (const value of enum_.values) {
    f.print(f.jsDoc(value, '    '));
    f.print`    '${value.localName}': {`;
    f.print`      value: ${importEnumFromJson(f)}(${importSchemaFromProto(f, enum_)}, ${JSON.stringify(value.name)}),`;
    addDescriptionField(f, value, '      ');
    addDeprecatedReasonField(f, value, '      ');
    f.print`    },`;
  }

  f.print`  } as const,`;
  f.print`});`;
  f.print();
}
