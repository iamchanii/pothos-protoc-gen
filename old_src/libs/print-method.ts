import type { DescMethod } from '@bufbuild/protobuf';
import type { GeneratedFile } from '@bufbuild/protoplugin';
import { camelCase, pascalCase } from 'change-case';
import { addDeprecatedReasonField } from './add-deprecated-reason-field.js';
import { addDescriptionField } from './add-description-field.js';
import { importBuilder } from './import-builder.js';
import type { PluginOptions } from './parse-options.js';
import { getInputConstructorName } from './print-input-constructor.js';

export function printMethod(
  f: GeneratedFile,
  method: DescMethod,
  options: PluginOptions,
) {
  const methodName = camelCase(`${method.parent.typeName}${method.name}`);
  const builderMethod =
    checkMethodType() === 'query' ? 'queryField' : 'mutationField';

  f.print(f.jsDoc(method));
  f.print`${importBuilder(f)}.${builderMethod}('${methodName}', t => t.field({`;
  f.print(f.jsDoc(method.output, '  '));
  f.print`  type: '${pascalCase(method.output.typeName)}',`;
  addDescriptionField(f, method, '  ');
  addDeprecatedReasonField(f, method, '  ');
  f.print`  args: {`;
  f.print(f.jsDoc(method.input, '    '));
  f.print`    input: t.arg({`;
  f.print`      type: '${pascalCase(`${method.input.typeName}Input`)}',`;
  f.print`      required: true,`;
  addDescriptionField(f, method.input, '      ');
  addDeprecatedReasonField(f, method.input, '      ');
  f.print`    }),`;
  f.print`  },`;
  f.print`  resolve: (_root, { input }, context) => {`;
  f.print`    if (!context.${camelCase(method.parent.name)}) throw new Error('${method.parent.name} is not provided.')`;
  f.print`    return context.${camelCase(method.parent.name)}.${method.localName}(`;
  f.print`      ${getInputConstructorName(method.input)}(input),`;
  f.print`      { headers: context.${camelCase(`${method.parent.name}RequestHeaders`)} },`;
  f.print`    );`;
  f.print`  },`;
  f.print`}));`;
  f.print();

  function checkMethodType(): 'query' | 'mutation' {
    // e.g. List...
    if (options.queryMethods?.has(method.name)) {
      return 'query';
    }

    // e.g. notification.v1.NotificationService.List...
    if (options.queryMethods?.has(`${method.parent.typeName}.${method.name}`)) {
      return 'query';
    }

    if (options.mutationMethods?.has(method.name)) {
      return 'mutation';
    }

    if (
      options.mutationMethods?.has(`${method.parent.typeName}.${method.name}`)
    ) {
      return 'mutation';
    }

    return /^(list|get|batchget)/.test(method.name.toLowerCase())
      ? 'query'
      : 'mutation';
  }
}
