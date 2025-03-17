import type { DescFile, DescMessage } from '@bufbuild/protobuf';
import { collectDependentMessages } from './collect-dependent-messages.js';
import { getFilteredServices } from './filter-services.js';
import type { PluginOptions } from './parse-options.js';

export function collectOutputMessages({
  file,
  addOutputMessage,
  options,
}: {
  file: DescFile;
  addOutputMessage: (message: DescMessage) => void;
  options: PluginOptions | undefined;
}) {
  const processedMessageNames = new Set<string>();

  for (const message of file.messages) {
    collectDependentMessages(message, processedMessageNames, addOutputMessage);
  }

  for (const service of getFilteredServices(file, options)) {
    for (const method of service.methods) {
      if (method.output) {
        collectDependentMessages(
          method.output,
          processedMessageNames,
          addOutputMessage,
        );
      }
    }
  }
}
