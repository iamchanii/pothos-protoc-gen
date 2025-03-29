import type { DescField, DescMessage } from '@bufbuild/protobuf';
import type { GeneratedFile } from '@bufbuild/protoplugin';
import { camelCase } from 'change-case';
import { getDescriptorName } from './get-descriptor-name.js';
import {
  importSchemaFromProto,
  importShapeFromProto,
} from './import-shape-from-proto.js';

export function getInputConstructorName(message: DescMessage) {
  return camelCase(`make_${getDescriptorName(message, 'Input')}`);
}

function getInputConstructor(f: GeneratedFile, field: DescField) {
  if (!field.message) {
    throw new Error('Invalid getInputConstructor used case.');
  }

  const constructorName = getInputConstructorName(field.message);

  if (field.parent.file === field.message.file) {
    return constructorName;
  }

  const importSymbol = f.importSchema(field.message);

  Object.assign(importSymbol, {
    name: constructorName,
    from: importSymbol.from.replace(/([^/]+)(?=$)/, '/index.js'),
  });

  Object.assign(importSymbol, {
    id: `import("${importSymbol.from}").${importSymbol.name}`,
  });

  return importSymbol;
}

export function printInputConstructor(f: GeneratedFile, message: DescMessage) {
  f.print(f.jsDoc(message));
  f.print`${f.export('function', getInputConstructorName(message))}(input: any): ${f.importShape(message)} {`;
  f.print`  return ${f.runtime.create}(${f.importSchema(message)}, {`;

  for (const field of message.fields) {
    if (field.oneof) continue;
    f.print(f.jsDoc(field, '    '));
    f.print`    ${field.localName}: ${getValueExpression(f, field)},`;
  }

  for (const oneof of message.oneofs) {
    f.print(f.jsDoc(oneof, '    '));
    f.print`    ${oneof.localName}:`;

    for (const field of oneof.fields) {
      f.print`      input?.${field.localName} ? { case: '${field.localName}', value: ${getValueExpression(f, field)} } :`;
    }
    f.print`      undefined,`;
  }

  f.print`  });`;
  f.print`}`;
  f.print();

  function getValueExpression(f: GeneratedFile, field: DescField) {
    switch (field.fieldKind) {
      case 'scalar':
      case 'enum':
        return `input?.${field.localName}`;

      case 'list':
        if (field.listKind === 'message') {
          return [
            `input?.${field.localName} ? `,
            `input.${field.localName}.map(`,
            getInputConstructor(f, field),
            ') : null',
          ];
        }

        return `input?.${field.localName}`;

      case 'message':
        return [
          `input?.${field.localName} ? `,
          getInputConstructor(f, field),
          `(input.${field.localName}) : null`,
        ];

      case 'map':
        if (field.mapKind === 'message') {
          return [
            `input?.${field.localName} ? `,
            'Object.fromEntries(',
            `input?.${field.localName}?.map(({ key, value }) => [key, `,
            getInputConstructor(f, field),
            '(value)])',
            ')',
            ' : null',
          ];
        }

        return [
          `input?.${field.localName} ? `,
          'Object.fromEntries(',
          `input?.${field.localName}?.map(({ key, value }) => [key, value])`,
          ')',
          ' : null',
        ];
    }
  }
}
