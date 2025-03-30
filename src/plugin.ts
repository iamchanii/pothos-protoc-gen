import {
  type Schema,
  createEcmaScriptPlugin,
  runNodeJs,
} from '@bufbuild/protoplugin';
import pkg from '../package.json' with { type: 'json' };
import { collectAllFiles } from './collect/collect-all-files.ts';
import { collect } from './collect/collect.js';
import { isPothosMapEntriesGeneratedFileExists } from './helpers/generated-file.ts';
import { type PluginOptions, parseOptions } from './plugin-options.js';
import { createPrintEnumTypeRef } from './print/print-enum-type-ref.js';
import { printFileImport } from './print/print-file-import.ts';
import { printGeneratedPothosContext } from './print/print-generated-pothos-context.ts';
import { createPrintInputConstructor } from './print/print-input-constructor.ts';
import { createPrintInputTypeRef } from './print/print-input-type-ref.ts';
import { createPrintMapEntryInputTypeRef } from './print/print-map-entry-input-type-ref.ts';
import { createPrintMapEntryObjectTypeRef } from './print/print-map-entry-object-type-ref.ts';
import { createPrintMethod } from './print/print-method.ts';
import { createPrintObjectTypeRef } from './print/print-object-type-ref.js';
import { printPothosMapEntriesImport } from './print/print-pothos-map-entries-import.ts';

export const pothosProtocGenPlugin = createEcmaScriptPlugin<PluginOptions>({
  name: 'pothos-protoc-gen',
  version: `v${pkg.version}`,
  generateTs,
  parseOptions,
  transpile: (files) => files,
});

runNodeJs(pothosProtocGenPlugin);

/**
 * Generates TypeScript code based on the given schema.
 *
 * This function collects various descriptors from the schema and processes them to generate
 * TypeScript code for enums, messages, map entries, and service methods. It also handles
 * imports and context generation.
 *
 * @param schema - Schema containing protocol buffer definitions with plugin options
 * @remarks
 * The function performs the following operations:
 * 1. Collects descriptors from the schema
 * 2. Generates enum type references
 * 3. Generates object type references for output messages
 * 4. Generates map entry object type references
 * 5. Generates input type references
 * 6. Generates map entry input type references
 * 7. Generates input constructors
 * 8. Generates methods
 * 9. Collects and prints file imports
 * 10. Handles Pothos map entries import if necessary
 * 11. Generates Pothos context
 */
function generateTs(schema: Schema<PluginOptions>) {
  const collectedDescriptors = collect(schema);

  collectedDescriptors.enums.forEach(createPrintEnumTypeRef(schema));
  collectedDescriptors.outputMessages.forEach(createPrintObjectTypeRef(schema));
  collectedDescriptors.outputMessageMapEntries.forEach(
    createPrintMapEntryObjectTypeRef(schema),
  );
  collectedDescriptors.inputMessages.forEach(createPrintInputTypeRef(schema));
  collectedDescriptors.inputMessageMapEntries.forEach(
    createPrintMapEntryInputTypeRef(schema),
  );
  collectedDescriptors.inputMessages.forEach(
    createPrintInputConstructor(schema),
  );
  collectedDescriptors.methods.forEach(createPrintMethod(schema));

  const files = collectAllFiles(collectedDescriptors);
  printFileImport(schema, files.values());

  if (isPothosMapEntriesGeneratedFileExists()) {
    printPothosMapEntriesImport(schema);
  }

  printGeneratedPothosContext(schema, collectedDescriptors.services.values());
}
