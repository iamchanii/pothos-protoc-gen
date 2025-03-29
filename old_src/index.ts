import {
  type Schema,
  createEcmaScriptPlugin,
  runNodeJs,
} from '@bufbuild/protoplugin';
import pkg from '../package.json' with { type: 'json' };
import { collect } from './libs/collect.js';
import { generateFileArtifact } from './libs/generate-file-artifact.js';
import { generateGlobalScalarMapEntries } from './libs/generate-global-scalar-map-entries.js';
import { generatePothosTypeRegistry } from './libs/generate-pothos-type-registry.js';
import { type PluginOptions, parseOptions } from './libs/parse-options.js';

runNodeJs(
  createEcmaScriptPlugin<PluginOptions>({
    name: 'pothos-protoc-gen',
    version: `v${pkg.version}`,
    generateTs,
    parseOptions,
    transpile: (files) => files,
  }),
);

function generateTs(schema: Schema<PluginOptions>) {
  const descriptorsByFileName = collect(schema.files, schema.options);

  for (const [fileName, descriptors] of descriptorsByFileName.entries()) {
    generateFileArtifact({
      schema,
      fileName,
      ...descriptors,
    });
  }

  generateGlobalScalarMapEntries(schema);
  generatePothosTypeRegistry(schema);
}
