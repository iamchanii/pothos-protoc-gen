import type { DescEnum, DescFile, DescMessage } from '@bufbuild/protobuf';

export function collectEnums({
  file,
  addEnum,
}: {
  file: DescFile;
  addEnum: (enum_: DescEnum) => void;
}) {
  for (const enum_ of file.enums) {
    addEnum(enum_);
  }

  for (const message of file.messages) {
    collectMessageEnums(message);
  }

  function collectMessageEnums(message: DescMessage) {
    for (const enum_ of message.nestedEnums) {
      addEnum(enum_);
    }

    for (const nestedMessage of message.nestedMessages) {
      collectMessageEnums(nestedMessage);
    }
  }
}
