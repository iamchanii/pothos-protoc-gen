import type { DescFile, DescService } from '@bufbuild/protobuf';

/**
 * Collects services from the provided descriptor file into a collection map.
 *
 * @param file - The descriptor file containing services to collect
 * @param includeServices - Optional set of service names to include. If provided, only services with names in this set will be collected
 * @param collection - Map to store collected services, using service names as keys
 *
 * @remarks
 * This function iterates through services in the descriptor file, optionally filtering by name,
 * and adds them to the collection if they aren't already present.
 */
export function collectAllServices(
  file: DescFile,
  includeServices: Set<string>,
  collection: Map<string, DescService>,
) {
  for (const service of file.services) {
    if (
      includeServices.size > 0 &&
      !(
        includeServices.has(service.name) ||
        includeServices.has(service.typeName)
      )
    ) {
      continue;
    }

    if (!collection.has(service.name)) {
      collection.set(service.name, service);
    }
  }
}
