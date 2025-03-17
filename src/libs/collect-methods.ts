import type { DescFile, DescMethod } from '@bufbuild/protobuf';
import { getFilteredServices } from './filter-services.js';
import type { PluginOptions } from './parse-options.js';

export function collectMethods({
  file,
  addMethod,
  options,
}: {
  file: DescFile;
  addMethod: (method: DescMethod) => void;
  options: PluginOptions | undefined;
}) {
  for (const service of getFilteredServices(file, options)) {
    for (const method of service.methods) {
      if (method.input.deprecated) continue;
      addMethod(method);
    }
  }
}
