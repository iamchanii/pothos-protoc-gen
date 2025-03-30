import type { DescEnum } from '@bufbuild/protobuf';
import type { Schema } from '@bufbuild/protoplugin';
import { getGeneratedFile } from '../helpers/generated-file.js';
import { getDescriptorComments } from '../helpers/get-descriptor-comments.js';
import { getDescriptorName } from '../helpers/get-descriptor-name.js';
import type { PluginOptions } from '../plugin-options.js';

/**
 * Generates code for an enum type reference in the output file.
 *
 * @param schema - Schema containing plugin options and configuration
 * @param enum_ - Enum descriptor to generate code for
 * @returns Nothing, but writes generated code to the appropriate output file
 *
 * @remarks
 * This function creates a named enum type reference based on the provided enum descriptor.
 * It generates code that:
 * - Includes JSDoc comments from the original enum
 * - Exports a constant named with the enum name plus "Ref" suffix
 * - Includes description, values, and metadata for each enum value
 * - Handles deprecation status of enum values
 * - Uses appropriate imports for runtime enum handling
 */
function printEnumTypeRef(schema: Schema<PluginOptions>, enum_: DescEnum) {
  const f = getGeneratedFile(schema, enum_.file);
  const enumName = getDescriptorName(enum_);
  const enumTypeRefName = `${enumName}Ref`;

  f.print(f.jsDoc(enum_));
  f.print`${f.export('const', enumTypeRefName)} = ${f.importPothosBuilder}.enumType('${enumName}', {`;
  f.print`  description: ${getDescriptorComments(enum_)},`;
  f.print`  values: {`;

  for (const enumValue of enum_.values) {
    const indent = '    '; // 4 spaces

    f.print(f.jsDoc(enumValue, indent));
    f.print`${indent}'${enumValue.localName}': {`;
    f.print`${indent}  value: ${f.importEnumFromJson}(${f.importSchema(enum_)}, ${JSON.stringify(enumValue.name)}),`;
    f.print`${indent}  description: ${getDescriptorComments(enumValue)},`;
    f.print`${indent}  deprecated: ${JSON.stringify(enumValue.deprecated)},`;
    f.print`${indent}},`;
  }

  f.print`  } as const,`;
  f.print`});`;
  f.print();
}

/**
 * Creates a function that prints enum type references based on the provided schema.
 *
 * @param schema - The schema containing type information and plugin options
 * @returns A function that takes an enum descriptor and returns its type reference string
 * @remarks This is a factory function that configures enum type reference printing
 * with the given schema context.
 */
export function createPrintEnumTypeRef(schema: Schema<PluginOptions>) {
  return (enum_: DescEnum) => {
    return printEnumTypeRef(schema, enum_);
  };
}
