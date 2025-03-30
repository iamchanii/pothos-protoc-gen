import type { DescMessage, DescService } from '@bufbuild/protobuf';
import { collectDependentMessages } from './collect-dependent-messages.js';

/**
 * Collects all method messages of a specific type from a collection of services.
 *
 * This function iterates through all services and their methods, collecting
 * non-deprecated messages of the specified type (input or output) and their
 * dependent messages into the provided collection map.
 *
 * @param services - The services whose method messages will be collected
 * @param type - Specifies whether to collect input or output messages
 * @param collection - A map to store the collected messages, keyed by message name
 */
export function collectAllMethodMessages(
  services: Iterable<DescService>,
  type: 'input' | 'output',
  collection: Map<string, DescMessage>,
) {
  for (const service of services) {
    for (const method of service.methods) {
      if (method[type] && !method[type].deprecated) {
        collectDependentMessages(method[type], collection);
      }
    }
  }
}
