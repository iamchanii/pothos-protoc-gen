import type { DescFile } from '@bufbuild/protobuf';
import type {
  GeneratedFile,
  ImportSymbol,
  Schema,
} from '@bufbuild/protoplugin';
import type { PluginOptions } from '../plugin-options.ts';

const generatedFileMap = new Map<string, GeneratedFile>();

/**
 * Retrieves or creates a generated TypeScript file for a given Protobuf descriptor file.
 *
 * This function maintains a cache of generated files to avoid recreating them for the same
 * descriptor file. If the file doesn't exist in the cache, it creates a new one, sets up
 * common imports and utilities, then caches it for future use.
 *
 * @param schema - The schema object containing generation options and methods
 * @param file - The Protobuf descriptor file to generate TypeScript for
 * @returns A generated file object that can be used to add TypeScript code
 */
export function getGeneratedFile(
  schema: Schema<PluginOptions>,
  file: DescFile,
) {
  let generatedFile = generatedFileMap.get(file.name);

  if (generatedFile === undefined) {
    generatedFile = schema.generateFile(`${file.name}_pothos.ts`);
    generatedFile.preamble(file);

    generatedFile.importBuilder = generatedFile!.import(
      'builder',
      schema.options.builderPath,
    );

    generatedFile.runtimeImportEnumFromJson = generatedFile!.import(
      'enumFromJson',
      '@bufbuild/protobuf',
    );

    generatedFileMap.set(file.name, generatedFile);
  }

  return generatedFile;
}

declare module '@bufbuild/protoplugin' {
  export interface GeneratedFile {
    importBuilder: ImportSymbol;
    runtimeImportEnumFromJson: ImportSymbol;
  }
}
