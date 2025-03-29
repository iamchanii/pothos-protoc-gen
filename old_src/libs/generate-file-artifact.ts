import { createRegistry } from '@bufbuild/protobuf';
import type { Schema } from '@bufbuild/protoplugin';
import type { DescriptorsMapValue } from './collect/collect.js';
import type { PluginOptions } from './parse-options.js';
import { printContextInterface } from './print-context-interface.js';
import { printEnumTypeRef } from './print-enum-type-refs.js';
import { printInputConstructor } from './print-input-constructor.js';
import { printInputMapEntryTypeRef } from './print-input-map-entry-type-ref.js';
import { printInputTypeRef } from './print-input-type-ref.js';
import { printMethod } from './print-method.js';
import { printObjectTypeRef } from './print-object-type-ref.js';
import { printOutputMapEntryTypeRef } from './print-output-map-entry-type-ref.js';
import { storage } from './store.js';

interface GenerateFileArtifactOptions extends DescriptorsMapValue {
  schema: Schema<PluginOptions>;
  fileName: string;
}

export function generateFileArtifact({
  schema,
  fileName,
  files,
  enums,
  outputMessages,
  inputMessages,
  services,
  outputEntries,
  inputEntries,
  methods,
}: GenerateFileArtifactOptions) {
  const registry = createRegistry(...schema.allFiles);

  storage.run({ registry }, () => {
    const f = schema.generateFile(`${fileName}_pothos.ts`);

    for (const file of files) {
      f.preamble(file);
    }

    for (const enum_ of enums) {
      printEnumTypeRef(f, enum_);
    }

    for (const entry of outputEntries.values()) {
      printOutputMapEntryTypeRef(f, entry);
    }

    for (const entry of inputEntries.values()) {
      printInputMapEntryTypeRef(f, entry);
    }

    for (const outputMessage of outputMessages) {
      printObjectTypeRef(f, outputMessage);
    }

    for (const inputMessage of inputMessages) {
      printInputTypeRef(f, inputMessage);
      printInputConstructor(f, inputMessage);
    }

    // printOutputTypeInterface(
    //   f,
    //   fileName,
    //   [...enums, ...outputMessages],
    //   outputEntries,
    // );
    //
    // printInputTypeInterface(
    //   f,
    //   fileName,
    //   [...enums, ...inputMessages],
    //   inputEntries,
    // );

    printContextInterface(f, fileName, [...services]);

    for (const method of methods) {
      printMethod(f, method, schema.options);
    }
  });
}
