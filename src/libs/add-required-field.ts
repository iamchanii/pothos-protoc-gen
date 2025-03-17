import type { AnyDesc } from '@bufbuild/protobuf';
import type { GeneratedFile } from '@bufbuild/protoplugin';
import { checkValidateRulesMessageOptionExists } from './check-validate-rules-message-option-exists.js';

export function addRequiredField(
  f: GeneratedFile,
  descriptor: AnyDesc,
  indent = '',
) {
  const hasValidateRulesMessage =
    checkValidateRulesMessageOptionExists(descriptor);

  if (hasValidateRulesMessage) {
    f.print(indent, 'required: true,');
  }
}
