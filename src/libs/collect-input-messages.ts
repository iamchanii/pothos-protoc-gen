import type { DescFile, DescMessage } from '@bufbuild/protobuf';
import { collectDependentMessages } from './collect-dependent-messages.js';
import { getFilteredServices } from './filter-services.js';
import type { PluginOptions } from './parse-options.js';

export function collectInputMessages({
  file,
  addInputMessage,
  options,
}: {
  file: DescFile;
  addInputMessage: (message: DescMessage) => void;
  options: PluginOptions | undefined;
}) {
  const processedMessageNames = new Set<string>();

  for (const service of getFilteredServices(file, options)) {
    for (const method of service.methods) {
      if (method.input) {
        collectDependentMessages(
          method.input,
          processedMessageNames,
          addInputMessage,
        );
      }
    }
  }
}
