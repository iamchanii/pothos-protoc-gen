import type { AnyDesc, DescFile } from '@bufbuild/protobuf';
import { getComments } from '@bufbuild/protoplugin';

export function getDescription(descriptor: Exclude<AnyDesc, DescFile>) {
  const comment = getComments(descriptor);

  return [comment.leading, comment.trailing]
    .filter(Boolean)
    .join('\n\n')
    .trim();
}
