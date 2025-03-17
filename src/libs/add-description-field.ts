import type { AnyDesc, DescFile } from '@bufbuild/protobuf';
import type { GeneratedFile } from '@bufbuild/protoplugin';
import { getDescription } from './get-description.js';

export function addDescriptionField(
  f: GeneratedFile,
  descriptor: Exclude<AnyDesc, DescFile>,
  indent = '',
) {
  const description = getDescription(descriptor);
  if (description) {
    f.print(indent, 'description: ', JSON.stringify(description), ',');
  }
}
