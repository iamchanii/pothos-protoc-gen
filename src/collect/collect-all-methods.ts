import type { DescMethod, DescService } from '@bufbuild/protobuf';

/**
 * Collects all non-deprecated methods from a set of services into a collection map.
 *
 * @param services - An iterable of service descriptors to collect methods from
 * @param collection - A map to store the collected methods, with service name and method name as keys
 *
 * This function iterates through all provided services and their methods, adding each non-deprecated
 * method to the collection map if a method with the same name doesn't already exist in the collection.
 * Methods that are marked as deprecated or have deprecated inputs are skipped.
 */
export function collectAllMethods(
  services: Iterable<DescService>,
  collection: Map<string, DescMethod>,
) {
  for (const service of services) {
    for (const method of service.methods) {
      if (method.deprecated || method.input.deprecated) continue;

      const collectionKey = `${method.parent.typeName}.${method.name}`;
      if (!collection.has(collectionKey)) {
        collection.set(collectionKey, method);
      }
    }
  }
}
