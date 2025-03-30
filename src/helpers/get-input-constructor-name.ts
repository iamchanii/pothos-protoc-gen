import type { DescMessage } from '@bufbuild/protobuf';
import { getDescriptorName } from './get-descriptor-name.ts';

export function getInputConstructorName(message: DescMessage) {
  return `make${getDescriptorName(message, 'Input')}`;
}
