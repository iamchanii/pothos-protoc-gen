import type { DescFile, DescService } from '@bufbuild/protobuf';
import { getFilteredServices } from './filter-services.js';
import type { PluginOptions } from './parse-options.js';

export function collectService({
  file,
  addService,
  options,
}: {
  file: DescFile;
  addService: (service: DescService) => void;
  options: PluginOptions | undefined;
}) {
  for (const service of getFilteredServices(file, options)) {
    addService(service);
  }
}
