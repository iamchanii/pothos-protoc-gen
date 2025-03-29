import type { DescMessage } from '@bufbuild/protobuf';
import { ScalarTypeWrapper } from '../helpers/scalar-type-wrapper.ts';
import type { MapEntry } from './types.ts';

/**
 * Collects all map entries from a collection of protocol buffer message descriptors.
 *
 * This function iterates through each message and its fields, identifying fields that are maps.
 * For each map field, it determines the appropriate descriptor name and descriptor object based on
 * the field's map kind (enum, message, or scalar), then adds this information to the provided collection map.
 *
 * @param messages - An iterable of message descriptors to process
 * @param collection - A map that will be populated with entries where:
 *                     - Keys are descriptor type names (string)
 *                     - Values are MapEntry objects containing the descriptor and field information
 *
 * @remarks
 * The function modifies the provided collection map by adding entries to it.
 * The descriptor name is determined differently based on the map kind:
 * - For 'enum': Uses the enum's type name
 * - For 'message': Uses the message's type name
 * - For 'scalar': Uses the string representation of the ScalarTypeWrapper
 */
export function collectAllMapEntriesFromMessages(
  messages: Iterable<DescMessage>,
  collection: Map<string, MapEntry>,
) {
  for (const message of messages) {
    for (const field of message.fields) {
      if (field.fieldKind === 'map') {
        const descriptorName = (() => {
          switch (field.mapKind) {
            case 'enum':
              return field.enum.typeName;
            case 'message':
              return field.message.typeName;
            case 'scalar':
              return ScalarTypeWrapper.fromScalarType(field.scalar).toString();
          }
        })();

        const descriptor = (() => {
          switch (field.mapKind) {
            case 'enum':
              return field.enum;
            case 'message':
              return field.message;
            case 'scalar':
              return field.scalar;
          }
        })();

        collection.set(descriptorName, { descriptor, field });
      }
    }
  }
}
