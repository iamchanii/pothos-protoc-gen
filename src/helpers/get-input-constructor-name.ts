import type { DescMessage } from '@bufbuild/protobuf';
import { getDescriptorName } from './get-descriptor-name.js';

export function getInputConstructorName(message: DescMessage) {
  return `make${getDescriptorName(message, 'Input')}`;
}
