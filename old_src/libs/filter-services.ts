import type { DescService } from '@bufbuild/protobuf';
import type { DescFile } from '@bufbuild/protobuf';
import type { PluginOptions } from './parse-options.js';

export function getFilteredServices(
  file: DescFile,
  options?: PluginOptions,
): DescService[] {
  return file.services.filter((service) =>
    includeServices({ service, options }),
  );
}

function includeServices({
  service,
  options,
}: {
  service: DescService;
  options: PluginOptions | undefined;
}) {
  if (!options?.includeServices) {
    return true;
  }

  return (
    options.includeServices.has(service.name) ||
    options.includeServices.has(service.typeName)
  );
}
