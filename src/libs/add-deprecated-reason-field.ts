import type { AnyDesc, DescFile } from '@bufbuild/protobuf';
import type { GeneratedFile } from '@bufbuild/protoplugin';
import { getDescription } from './get-description.js';

export function addDeprecatedReasonField(
  f: GeneratedFile,
  descriptor: Exclude<AnyDesc, DescFile>,
  indent = '',
) {
  if (descriptor.deprecated) {
    const description = getDescription(descriptor);

    f.print(
      indent,
      'deprecationReason: ',
      JSON.stringify(description || 'Depreacted.'),
      ',',
    );
  }
}
