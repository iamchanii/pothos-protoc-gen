import type { DescFile } from '@bufbuild/protobuf';
import type { GeneratedFile, Schema } from '@bufbuild/protoplugin';
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

    if (schema.options.printPreamble) {
      generatedFile.preamble(file);
    }

    extendGeneratedFile(schema, generatedFile);

    generatedFileMap.set(file.name, generatedFile);
  }

  return generatedFile;
}

/**
 * Creates a function that returns a reusable GeneratedFile for a specific filename.
 * This helps in ensuring that the same file is not generated multiple times within a schema context.
 *
 * @param filename - The name of the file to be generated
 * @returns A function that takes a schema and returns a GeneratedFile
 * @remarks The generated file is created only once when the returned function is first called.
 * Subsequent calls will return the same GeneratedFile instance.
 */
function createReusableGeneratedFile(filename: string) {
  let generatedFile: GeneratedFile | undefined;

  return [
    (schema: Schema<PluginOptions>) => {
      if (generatedFile === undefined) {
        generatedFile = schema.generateFile(filename);
        extendGeneratedFile(schema, generatedFile);
      }

      return generatedFile;
    },
    () => generatedFile !== undefined,
  ] as const;
}

export const [
  getPothosMapEntriesGeneratedFile,
  isPothosMapEntriesGeneratedFileExists,
] = createReusableGeneratedFile('generated-map-entries.ts');

export const [getPothosIndexGeneratedFile] = createReusableGeneratedFile(
  'generated-pothos.ts',
);
