import type { DescService } from '@bufbuild/protobuf';
import type { PluginOptions } from './parse-options.js';
export function includeServices({
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
