import type { DescFile } from '@bufbuild/protobuf';
import type {
  GeneratedFile,
  ImportSymbol,
  Schema,
} from '@bufbuild/protoplugin';
import type { PluginOptions } from '../plugin-options.js';
import { extendGeneratedFile } from './extend-generated-file.js';

const generatedFileMap = new Map<string, GeneratedFile>();

/**
 * Retrieves or creates a generated file for the given descriptor file.
 *
 * @param schema - The schema object used to generate files
 * @param file - The descriptor file for which to get a generated file
 * @returns The generated file object
 *
 * @remarks
 * This function maintains a mapping between descriptor file names and their corresponding generated files.
 * If a generated file for the given descriptor file already exists, it returns the existing file.
 * Otherwise, it creates a new generated file, sets up its preamble, extends it, and adds it to the mapping.
 */
export function getGeneratedFile(
  schema: Schema<PluginOptions>,
  file: DescFile,
) {
  let generatedFile = generatedFileMap.get(file.name);

  if (generatedFile === undefined) {
    generatedFile = schema.generateFile(`${file.name}_pothos.ts`);
    generatedFile.preamble(file);
    extendGeneratedFile(schema, generatedFile);

    generatedFileMap.set(file.name, generatedFile);
  }

  return generatedFile;
}
