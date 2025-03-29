import type { DescMessage } from '@bufbuild/protobuf';

/**
 * Recursively collects a message and all of its dependent messages into a result map.
 *
 * This function traverses the given message's fields and nested messages, adding each
 * unique message to the result map using its type name as the key. It handles circular
 * dependencies by checking if a message is already in the result map before processing it.
 *
 * @param message - The message descriptor to process
 * @param result - A map that will be populated with all dependent messages, keyed by type name
 */
export function collectDependentMessages(
  message: DescMessage,
  result: Map<string, DescMessage>,
): void {
  if (result.has(message.typeName)) return;
  result.set(message.typeName, message);

  for (const field of message.fields) {
    if (field.message) {
      collectDependentMessages(field.message, result);
    }
  }

  for (const nestedMessage of message.nestedMessages) {
    collectDependentMessages(nestedMessage, result);
  }
}
