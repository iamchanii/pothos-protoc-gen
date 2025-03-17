import { AsyncLocalStorage } from 'node:async_hooks';
import type { Registry } from '@bufbuild/protobuf';

export const storage = new AsyncLocalStorage<{
  registry: Registry;
}>();
