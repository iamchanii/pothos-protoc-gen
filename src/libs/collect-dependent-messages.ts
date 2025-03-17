import type { DescMessage } from '@bufbuild/protobuf';

export function collectDependentMessages(
  message: DescMessage,
  processedMessageNames: Set<string>,
  collect: (message: DescMessage) => void,
): void {
  if (processedMessageNames.has(message.typeName)) return;
  processedMessageNames.add(message.typeName);

  collect(message);

  // 메시지의 모든 필드를 순회
  for (const field of message.fields) {
    if (field.message) {
      collectDependentMessages(field.message, processedMessageNames, collect);
    }
  }

  for (const nestedMessage of message.nestedMessages) {
    collectDependentMessages(nestedMessage, processedMessageNames, collect);
  }
}
