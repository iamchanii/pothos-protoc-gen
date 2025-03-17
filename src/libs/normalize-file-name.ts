import type { DescFile } from '@bufbuild/protobuf';

export function normalizeFileName(file: DescFile) {
  return file.name.split('/').slice(0, -1).join('/');
}
