import type { DescFile } from '@bufbuild/protobuf';
import type { Schema } from '@bufbuild/protoplugin';
import { getPothosIndexGeneratedFile } from '../helpers/generated-file.js';
import type { PluginOptions } from '../plugin-options.js';

/**
 * Generates import statements for all the provided descriptor files.
 * Each file is exported from a corresponding '_pothos' file, with the extension
 * determined by the schema options.
 *
 * @param schema - The schema containing plugin options including import extension configuration
 * @param files - An iterable of descriptor files to generate import statements for
 * @returns Nothing, but modifies the Pothos index file with export statements
 *
 * @remarks
 * This function creates exports in the index file that reference generated Pothos files.
 * The import extension can be configured or disabled entirely via schema options.
 */
export function printFileImport(
  schema: Schema<PluginOptions>,
  files: Iterable<DescFile>,
) {
  const f = getPothosIndexGeneratedFile(schema);

  for (const file of files) {
    f.print`export * from './${file.name}_pothos.ts';`;
  }
}
