import {
  type DescEnum,
  type DescField,
  type DescFile,
  type DescMessage,
  type DescMethod,
  type DescService,
  ScalarType,
} from '@bufbuild/protobuf';
import {
  getScalarMapEntryKey,
  globalScalarMapEntries,
} from '../global-scalar-map-registry.js';
import { normalizeFileName } from '../normalize-file-name.js';
import type { PluginOptions } from '../parse-options.js';
import { collectEnums } from './collect-enums.js';
import { collectInputMessages } from './collect-input-messages.js';
import { collectMethods } from './collect-methods.js';
import { collectOutputMessages } from './collect-output-messages.js';
import { collectService } from './collect-service.js';

type MapEntryKey = string;

type MapEntry = {
  message: DescMessage;
  field: DescField;
};

export type DescriptorsMapValue = {
  enums: Set<DescEnum>;
  inputMessages: Set<DescMessage>;
  outputMessages: Set<DescMessage>;
  services: Set<DescService>;
  files: Set<DescFile>;
  inputEntries: Map<MapEntryKey, MapEntry>;
  outputEntries: Map<MapEntryKey, MapEntry>;
  methods: Set<DescMethod>;
};

// 컬렉션 타입 정의
type CollectionType = keyof Omit<
  DescriptorsMapValue,
  'inputEntries' | 'outputEntries'
>;

export function collect(files: readonly DescFile[], options?: PluginOptions) {
  const descriptorsByFileNameMap = new Map<string, DescriptorsMapValue>();

  // 모든 파일 처리
  for (const file of files) {
    processFile(file, options);
  }

  return descriptorsByFileNameMap;

  // 단일 파일 처리 함수
  function processFile(file: DescFile, options?: PluginOptions) {
    // DescFile은 특별 처리
    addFile(file);

    // 각 컬렉션 타입별 수집 함수 호출
    collectEnums({
      file,
      addEnum: (enum_) => addToCollection(enum_, 'enums', enum_.file),
    });

    collectInputMessages({
      file,
      addInputMessage: (message) => {
        addToCollection(message, 'inputMessages', message.file);
        collectMapEntries(
          message,
          getDescriptorsMap(message.file).inputEntries,
        );
      },
      options,
    });

    collectOutputMessages({
      file,
      addOutputMessage: (message) => {
        addToCollection(message, 'outputMessages', message.file);
        collectMapEntries(
          message,
          getDescriptorsMap(message.file).outputEntries,
        );
      },
      options,
    });

    collectService({
      file,
      addService: (service) =>
        addToCollection(service, 'services', service.file),
      options,
    });

    collectMethods({
      file,
      addMethod: (method) =>
        addToCollection(method, 'methods', method.parent.file),
      options,
    });
  }

  // 일반화된 컬렉션 추가 함수
  function addToCollection<T>(
    item: T,
    collectionType: CollectionType,
    file: DescFile,
  ) {
    const map = getDescriptorsMap(file);
    const collection = map[collectionType] as Set<T>;
    collection.add(item);
  }

  // DescFile 전용 추가 함수
  function addFile(file: DescFile) {
    const map = getDescriptorsMap(file);
    map.files.add(file);
  }

  // 새로운 빈 DescriptorsMapValue 객체 생성
  function createEmptyDescriptorsMap(): DescriptorsMapValue {
    return {
      enums: new Set(),
      inputMessages: new Set(),
      outputMessages: new Set(),
      services: new Set(),
      files: new Set(),
      inputEntries: new Map(),
      outputEntries: new Map(),
      methods: new Set(),
    };
  }

  // 파일에 해당하는 DescriptorsMapValue 가져오기
  function getDescriptorsMap(file: DescFile): DescriptorsMapValue {
    const fileName = normalizeFileName(file);
    let map = descriptorsByFileNameMap.get(fileName);

    if (!map) {
      map = createEmptyDescriptorsMap();
      descriptorsByFileNameMap.set(fileName, map);
    }

    return map;
  }

  function collectMapEntries(
    message: DescMessage,
    entries: Map<MapEntryKey, MapEntry>,
  ) {
    // 메시지의 모든 필드를 순회하며 맵 타입 필드 처리
    processMessageFields(message, entries);

    // 중첩된 메시지에 대해 재귀적으로 처리
    for (const nestedMessage of message.nestedMessages) {
      collectMapEntries(nestedMessage, entries);
    }
  }

  // 메시지 필드 처리를 위한 별도 함수
  function processMessageFields(
    message: DescMessage,
    entries: Map<MapEntryKey, MapEntry>,
  ) {
    for (const field of message.fields) {
      if (field.fieldKind !== 'map') continue;

      if (field.mapKind === 'scalar') {
        addToGlobalScalarMapEntries(message, field);
      } else {
        addToLocalMapEntries(message, field, entries);
      }
    }
  }

  // 글로벌 스칼라 맵 엔트리 추가
  function addToGlobalScalarMapEntries(message: DescMessage, field: DescField) {
    const globalKey = getScalarMapEntryKey(field);
    if (!globalScalarMapEntries.has(globalKey)) {
      globalScalarMapEntries.set(globalKey, { message, field });
    }
  }

  // 로컬 맵 엔트리 추가
  function addToLocalMapEntries(
    message: DescMessage,
    field: DescField,
    entries: Map<MapEntryKey, MapEntry>,
  ) {
    const groupKey = `${message.typeName}:${field.localName}`;
    if (!entries.has(groupKey)) {
      entries.set(groupKey, { message, field });
    }
  }
}
