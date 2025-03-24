import type { AnyDesc } from '@bufbuild/protobuf';
import type { GeneratedFile } from '@bufbuild/protoplugin';
import { checkValidateRulesMessageOptionExists } from './check-validate-rules-message-option-exists.js';

export function addNullableField(
  f: GeneratedFile,
  descriptor: AnyDesc,
  indent = '',
) {
  const isListField =
    descriptor.kind === 'field' && descriptor.fieldKind === 'list';

  const hasValidateRulesMessage =
    checkValidateRulesMessageOptionExists(descriptor);

  const isIDField =
    descriptor.kind === 'field' && descriptor.localName === 'id';

  if ((!isListField && hasValidateRulesMessage) || isIDField) {
    f.print(indent, 'nullable: false as never,');
  }
}
