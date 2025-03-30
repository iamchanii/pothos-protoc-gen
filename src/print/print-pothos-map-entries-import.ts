import type { Schema } from '@bufbuild/protoplugin';
import { getPothosIndexGeneratedFile } from '../helpers/generated-file.ts';
import type { PluginOptions } from '../plugin-options.ts';

/**
 * Prints an import statement for Pothos map entries in the generated code.
 * @param schema - The schema with plugin options.
 * @returns Nothing.
 * @remarks
 * This function generates an export statement that imports all exports from
 * the 'generated-map-entries' file, with the appropriate extension based on
 * the schema options. If the importExtension option is set to 'none', no
 * extension will be used.
 */
export function printPothosMapEntriesImport(schema: Schema<PluginOptions>) {
  const f = getPothosIndexGeneratedFile(schema);
  const importExtension =
    schema.options.importExtension === 'none'
      ? ''
      : `.${schema.options.importExtension}`;

  f.print`export * from './generated-map-entries${importExtension}';`;
}
