import type { DescFile } from '@bufbuild/protobuf';
import type { CollectedDescriptors } from './types.js';

/**
 * Collects all descriptor files from the given collection of descriptors.
 *
 * @param collectedDescriptors - The collection of descriptors containing services,
 * input messages, output messages, and enums
 * @returns A Map where keys are file names and values are the descriptor files
 * @remarks This function extracts unique files from all descriptors by using
 * the file name as a key to avoid duplicates
 */
export function collectAllFiles(collectedDescriptors: CollectedDescriptors) {
  const files = new Map<string, DescFile>();
  const { services, inputMessages, outputMessages, enums } =
    collectedDescriptors;

  for (const service of services.values()) {
    files.set(service.file.name, service.file);
  }

  for (const inputMessage of inputMessages.values()) {
    files.set(inputMessage.file.name, inputMessage.file);
  }

  for (const outputMessage of outputMessages.values()) {
    files.set(outputMessage.file.name, outputMessage.file);
  }

  for (const enum_ of enums.values()) {
    files.set(enum_.file.name, enum_.file);
  }

  return files;
}
