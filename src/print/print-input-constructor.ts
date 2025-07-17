import type { DescField, DescMessage } from '@bufbuild/protobuf';
import type { Schema } from '@bufbuild/protoplugin';
import { getGeneratedFile } from '../helpers/generated-file.js';
import { getInputConstructorName } from '../helpers/get-input-constructor-name.js';
import { getInputConstructor } from '../helpers/get-input-constructor.js';
import type { PluginOptions } from '../plugin-options.js';

/**
 * Generates an input constructor function for the given message type.
 * The generated function is responsible for converting plain input objects
 * to the proper schema-compatible structure.
 *
 * @param schema - The schema containing plugin options and configuration
 * @param message - The descriptor message for which to generate an input constructor
 *
 * @returns Nothing, but writes the input constructor function to the generated file
 *
 * @remarks
 * - Creates a function that converts user-friendly input objects to the proper internal representation
 * - Handles regular fields, oneofs, and different field types (scalar, enum, list, message, map)
 * - For nested message types, recursively uses appropriate input constructors
 * - Automatically adds proper imports for cross-file message references
 * - The generated function follows the naming convention `make[MessageName]Input`
 * - All fields are made optional with null/undefined handling
 */
function printInputConstructor(
  schema: Schema<PluginOptions>,
  message: DescMessage,
) {
  const f = getGeneratedFile(schema, message.file);
  const functionName = getInputConstructorName(message);
  const description = `A function to make a ${message.typeName} input`;

  f.print(f.jsDoc(description));
  f.print`${f.export('function', functionName)}(input: any): ${f.importShape(message)} {`;
  f.print`  return ${f.runtime.create}(${f.importSchema(message)}, {`;

  const indent = '    '; // 4 spaces

  for (const field of message.fields) {
    if (field.oneof) continue;
    f.print(f.jsDoc(field, indent));
    f.print`${indent}${field.localName}: ${getValueExpression(field)},`;
  }

  for (const oneof of message.oneofs) {
    f.print(f.jsDoc(oneof, indent));
    f.print`${indent}${oneof.localName}:`;
    for (const field of oneof.fields) {
      const indent = '      '; // 6 spaces
      f.print`${indent}typeof input?.${field.localName} !== 'undefined' ? { case: '${field.localName}', value: ${getValueExpression(field)} } :`;
    }
    f.print`      undefined,`;
  }

  f.print`  });`;
  f.print`}`;
  f.print();

  /**
   * Generates a value expression for a field based on its kind.
   * This function produces TypeScript expressions that handle various field types
   * including scalar, enum, list, message, and map fields.
   *
   * @param field - The descriptor field for which to generate a value expression
   * @returns An expression string or array of strings representing how to access/transform the field value
   *
   * @remarks
   * - For scalar and enum fields, simply returns the input field access
   * - For list fields of message type, maps each item through an input constructor
   * - For list fields of non-message type, returns the input field directly
   * - For message fields, applies an input constructor to the field value
   * - For map fields, handles both message and non-message value types differently,
   *   converting from a key-value pair array to an object
   */
  function getValueExpression(field: DescField) {
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

export function createPrintInputConstructor(schema: Schema<PluginOptions>) {
  return (message: DescMessage) => {
    return printInputConstructor(schema, message);
  };
}
