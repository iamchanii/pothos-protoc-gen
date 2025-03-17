import type { GeneratedFile } from '@bufbuild/protoplugin';

export function importEnumFromJson(f: GeneratedFile) {
  return f.import('enumFromJson', '@bufbuild/protobuf');
}
