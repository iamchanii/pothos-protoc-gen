import type { DescField, DescMessage } from '@bufbuild/protobuf';

type MapEntryKey = string;

type MapEntry = {
  message: DescMessage;
  field: DescField;
};

// 전역 스칼라 map entry들을 저장하는 레지스트리
export const globalScalarMapEntries: Map<MapEntryKey, MapEntry> = new Map();

// 스칼라 타입의 map 필드에 대해 그룹 키를 생성합니다.
// 예를 들어, field.scalar가 ScalarType.INT32인 경우 "scalar:Int32"와 같이 생성.
export function getScalarMapEntryKey(field: DescField): MapEntryKey {
  return `scalar:${field.scalar}`;
}
