#!/usr/bin/env node --disable-warning=ExperimentalWarning
import {
  type Schema,
  createEcmaScriptPlugin,
  runNodeJs,
} from '@bufbuild/protoplugin';
import pkg from '../package.json' with { type: 'json' };
import { collect } from './collect/collect.js';
import { type PluginOptions, parseOptions } from './plugin-options.js';
import { createPrintEnumTypeRef } from './print/print-enum-type-ref.js';
import { createPrintObjectTypeRef } from './print/print-object-type-ref.js';

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

  collectedDescriptors.enums.forEach(createPrintEnumTypeRef(schema));
  collectedDescriptors.outputMessages.forEach(createPrintObjectTypeRef(schema));
  // collectedDescriptors.outputMessageMapEntries.forEach(
  // collectedDescriptors.inputMessages ref and constructor
  // collectedDescriptors.inputMessageMapEntries
  // collectedDescriptors.services printContextInterface
  // collectedDescriptors.methods printMethod

  // generateGlobalScalarMapEntries(schema);
  // generatePothosTypeRegistry(schema);
}
