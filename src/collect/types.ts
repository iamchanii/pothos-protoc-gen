import type {
  DescEnum,
  DescField,
  DescMessage,
  DescMethod,
  DescService,
  ScalarType,
} from '@bufbuild/protobuf';

export interface MapEntry {
  descriptor: DescEnum | DescMessage | ScalarType;
  field: DescField;
}

export interface CollectedDescriptors {
  services: Map<string, DescService>;
  methods: Map<string, DescMethod>;
  enums: Map<string, DescEnum>;
  inputMessages: Map<string, DescMessage>;
  inputMessageMapEntries: Map<string, MapEntry>;
  outputMessages: Map<string, DescMessage>;
  outputMessageMapEntries: Map<string, MapEntry>;
}
