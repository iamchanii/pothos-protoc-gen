import type { DescFile } from '@bufbuild/protobuf';

export function normalizeFileName(file: DescFile) {
  return file.name;
}
