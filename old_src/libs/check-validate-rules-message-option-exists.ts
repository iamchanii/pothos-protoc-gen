import type { AnyDesc } from '@bufbuild/protobuf';
import { parseDescriptorProtoOptions } from './parse-descriptor-proto-options.js';

export function checkValidateRulesMessageOptionExists(descriptor: AnyDesc) {
  const options = parseDescriptorProtoOptions(descriptor);

  if (!options) {
    return false;
  }

  return options['[validate.rules]']?.message?.required === true;
}
