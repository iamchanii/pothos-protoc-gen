import type { DescService } from '@bufbuild/protobuf';
import { camelCase } from 'change-case';

export function getServiceFieldName(service: DescService) {
  return camelCase(service.typeName);
}

export function getServiceRequestHeadersFieldName(service: DescService) {
  return `${getServiceFieldName(service)}RequestHeaders`;
}
