import type { GeneratedFile } from '@bufbuild/protoplugin';

export function importBuilder(f: GeneratedFile) {
  return f.import('builder', '@/builder.js');
}

export function importEncodeBase64(f: GeneratedFile) {
  return f.import('encodeBase64', '@pothos/core');
}
