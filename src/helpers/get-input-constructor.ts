import type { DescField, DescMessage } from '@bufbuild/protobuf';
import type { GeneratedFile } from '@bufbuild/protoplugin';
import { getInputConstructorName } from './get-input-constructor-name.js';

/**
 * Gets the constructor function for an input message type.
 *
 * @param f - The generated file context
 * @param fieldOrMessage - Either a field descriptor with a message type or a message descriptor directly
 * @returns The constructor name (string) if in the same file, or an import symbol object if from another file
 * @throws Error if provided a field without a message property
 * @remarks
 * This function determines the appropriate input constructor based on the type of the input:
 * - For a field with a message type, it gets the input constructor for that message
 * - For a message directly, it uses that message for the input constructor
 *
 * The return value depends on file context:
 * - If the message is in the same file as the field's parent, returns just the constructor name
 * - If in different files, returns an import symbol to reference the input constructor function
 */
export function getInputConstructor(
  f: GeneratedFile,
  fieldOrMessage: DescField | DescMessage,
) {
  if (fieldOrMessage.kind === 'field' && !fieldOrMessage.message) {
    throw new Error('Invalid getInputConstructor used case.');
  }

  const message =
    fieldOrMessage.kind === 'field' ? fieldOrMessage.message : fieldOrMessage;

  const constructorName = getInputConstructorName(message);

  if (
    fieldOrMessage.kind === 'field' &&
    fieldOrMessage.parent.file === message.file
  ) {
    return constructorName;
  }

  const importSymbol = f.importSchema(message);

  Object.assign(importSymbol, {
    name: constructorName,
    from: importSymbol.from.replace(/_pb\.(.+)$/, '_pothos.$1'),
  });

  Object.assign(importSymbol, {
    id: `import("${importSymbol.from}").${importSymbol.name}`,
  });

  return importSymbol;
}
