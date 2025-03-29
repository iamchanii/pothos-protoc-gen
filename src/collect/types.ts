import type {
  DescEnum,
  DescField,
  DescMessage,
  DescMethod,
  DescService,
  ScalarType,
} from '@bufbuild/protobuf';
import type { ScalarTypeWrapper } from '../helpers/scalar-type-wrapper.js';

export interface MapEntry {
  descriptor: DescEnum | DescMessage | ScalarType;
  field: DescField;
}

export interface CollectedDescriptors {
  services: Map<string, DescService>;
  methods: Map<string, DescMethod>;
  enums: Map<string, DescEnum>;
  inputMessages: Map<string, DescMessage>;
  inputMessageMapEntries: Map<ScalarTypeWrapper | string, MapEntry>;
  outputMessages: Map<string, DescMessage>;
  outputMessageMapEntries: Map<ScalarTypeWrapper | string, MapEntry>;
}
