import type { Schema } from '@bufbuild/protoplugin';
import type { PluginOptions } from '../plugin-options.js';
import { collectAllEnums } from './collect-all-enums.js';
import { collectAllMapEntriesFromMessages } from './collect-all-map-entries-from-message.js';
import { collectAllMethodMessages } from './collect-all-method-messages.js';
import { collectAllMethods } from './collect-all-methods.js';
import { collectAllServices } from './collect-all-services.js';
import type { CollectedDescriptors } from './types.js';

/**
 * Collects various descriptors from a Protobuf schema.
 *
 * @param schema - The schema object containing Protobuf files and plugin options
 * @returns A CollectedDescriptors object with the following maps:
 *   - services: Map of service descriptors
 *   - methods: Map of method descriptors
 *   - inputMessages: Map of input message descriptors
 *   - inputMessageMapEntries: Map of input message map entry descriptors
 *   - outputMessages: Map of output message descriptors
 *   - outputMessageMapEntries: Map of output message map entry descriptors
 *   - enums: Map of enum descriptors
 *
 * @remarks
 * This function processes each file in the schema to:
 * - Collect all services based on the includeServices option
 * - Collect all methods from the services
 * - Collect all input and output messages from the methods
 * - Collect all map entries from the input and output messages
 * - Collect all enums from the input and output messages
 */
export function collect(schema: Schema<PluginOptions>): CollectedDescriptors {
  const collectedDescriptors: CollectedDescriptors = {
    services: new Map(),
    methods: new Map(),
    inputMessages: new Map(),
    inputMessageMapEntries: new Map(),
    outputMessages: new Map(),
    outputMessageMapEntries: new Map(),
    enums: new Map(),
  };

  for (const file of schema.files) {
    collectAllServices(
      file,
      schema.options.includeServices,
      collectedDescriptors.services,
    );

    collectAllMethods(
      collectedDescriptors.services.values(),
      collectedDescriptors.methods,
    );

    collectAllMethodMessages(
      collectedDescriptors.services.values(),
      'input',
      collectedDescriptors.inputMessages,
    );

    collectAllMapEntriesFromMessages(
      collectedDescriptors.inputMessages.values(),
      collectedDescriptors.inputMessageMapEntries,
    );

    collectAllMethodMessages(
      collectedDescriptors.services.values(),
      'output',
      collectedDescriptors.outputMessages,
    );

    collectAllMapEntriesFromMessages(
      collectedDescriptors.outputMessages.values(),
      collectedDescriptors.outputMessageMapEntries,
    );

    collectAllEnums(
      [
        ...collectedDescriptors.inputMessages.values(),
        ...collectedDescriptors.outputMessages.values(),
      ],
      collectedDescriptors.enums,
    );
  }

  return collectedDescriptors;
}
