import type { AnyDesc, DescFile } from '@bufbuild/protobuf';
import { getComments } from '@bufbuild/protoplugin';

/**
 * Extracts and formats comments from a descriptor.
 *
 * @param descriptor - The descriptor from which to extract comments (any descriptor type except DescFile)
 * @returns A string containing the combined leading and trailing comments, separated by a blank line
 * @remarks This function combines both leading and trailing comments, filters out empty ones,
 * and returns them as a single trimmed string with proper spacing.
 */
export function getDescriptorComments(descriptor: Exclude<AnyDesc, DescFile>) {
  const comment = getComments(descriptor);
  const concatenatedComments = [comment.leading, comment.trailing]
    .filter(Boolean)
    .join('\n\n')
    .trim();

  return concatenatedComments
    ? JSON.stringify(concatenatedComments)
    : 'undefined';
}
