import type { DescMessage } from '@bufbuild/protobuf';
import type { GeneratedFile } from '@bufbuild/protoplugin';
import { addDeprecatedReasonField } from './add-deprecated-reason-field.js';
import { addDescriptionField } from './add-description-field.js';
import { addRequiredField } from './add-required-field.js';
import { getDescriptorName } from './get-descriptor-name.js';
import { getInputFieldType } from './get-field-type.js';
import { importBuilder } from './import-builder.js';
import { importShapeFromProto } from './import-shape-from-proto.js';

export function printInputTypeRef(f: GeneratedFile, message: DescMessage) {
  const messageName = getDescriptorName(message, 'Input');

  f.print(f.jsDoc(message));
  f.print`${f.export('const', `${messageName}Ref`)} = ${importBuilder(f)}.inputRef<${f.importShape(message)}>('${messageName}').implement({`;

  addDescriptionField(f, message, '  ');
  f.print`  fields: t => ({`;
  f.print`    _typeName: t.string(),`;

  for (const field of message.fields) {
    f.print(f.jsDoc(field, '    '));
    f.print`    ${field.localName}: t.field({`;
    f.print`      type: ${JSON.stringify(getInputFieldType(field))},`;

    addDescriptionField(f, field, '      ');
    addDeprecatedReasonField(f, field, '      ');
    addRequiredField(f, field, '      ');
    f.print`    }),`;
  }
  f.print`  }),`;
  f.print`});`;
  f.print();
}
