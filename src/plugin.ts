#!/usr/bin/env node --disable-warning=ExperimentalWarning
import {
  type Schema,
  createEcmaScriptPlugin,
  runNodeJs,
} from '@bufbuild/protoplugin';
import pkg from '../package.json' with { type: 'json' };
import { collect } from './collect/collect.ts';
import { type PluginOptions, parseOptions } from './plugin-options.ts';
import { createPrintEnumTypeRef } from './print/print-enum-type-ref.ts';
import { createPrintObjectTypeRef } from './print/print-object-type-ref.ts';

export const pothosProtocGenPlugin = createEcmaScriptPlugin<PluginOptions>({
  name: 'pothos-protoc-gen',
  version: `v${pkg.version}`,
  generateTs,
  parseOptions,
  transpile: (files) => files,
});

runNodeJs(pothosProtocGenPlugin);

function generateTs(schema: Schema<PluginOptions>) {
  const collectedDescriptors = collect(schema);

  // const {
  //   enums,
  //   outputMessages,
  //   outputMessageMapEntries,
  //   inputMessages,
  //   inputMessageMapEntries,
  //   methods,
  //   services,
  // } = collectedDescriptors;

  collectedDescriptors.enums.forEach(createPrintEnumTypeRef(schema));
  collectedDescriptors.outputMessages.forEach(createPrintObjectTypeRef(schema));

  // const descriptorsByFileName = collect(schema.files, schema.options);
  // for (const [fileName, descriptors] of descriptorsByFileName.entries()) {
  //   generateFileArtifact({
  //     schema,
  //     fileName,
  //     ...descriptors,
  //   });
  // }
  // generateGlobalScalarMapEntries(schema);
  // generatePothosTypeRegistry(schema);
}
