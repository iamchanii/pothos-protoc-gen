import type { DescEnum, DescMessage } from '@bufbuild/protobuf';

/**
 * Collects all enum types from a collection of message descriptors and stores them in a map.
 * This function traverses the provided messages, examining both their fields and nested enums.
 *
 * @param messages - The iterable collection of message descriptors to process
 * @param collection - The map to store discovered enum descriptors, keyed by their type names
 * @returns Nothing. This function modifies the collection map in-place.
 * @remarks
 * The function collects enums from two sources within each message:
 * 1. Fields that are of kind 'enum'
 * 2. Nested enum definitions
 *
 * Duplicate enums (based on typeName) are not added to the collection.
 */
export function collectAllEnums(
  messages: Iterable<DescMessage>,
  collection: Map<string, DescEnum>,
) {
  for (const message of messages) {
    for (const field of message.fields) {
      if (field.enum) {
        if (!collection.has(field.enum.typeName)) {
          collection.set(field.enum.typeName, field.enum);
        }
      }
    }

    for (const nestedEnum of message.nestedEnums) {
      if (!collection.has(nestedEnum.typeName)) {
        collection.set(nestedEnum.typeName, nestedEnum);
      }
    }
  }
}
