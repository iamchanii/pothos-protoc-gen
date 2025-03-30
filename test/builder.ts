import SchemaBuilder from '@pothos/core';
import type { GeneratedPothosContext } from './out/generated-pothos.ts';

export const builder = new SchemaBuilder<{
  Context: GeneratedPothosContext;
}>({});
