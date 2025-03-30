import { builder } from '../builder.js';

/**
 * Map field with scalar value type.
 * Maps tag names to view counts.
 *
 * @generated from field: map<string, int32> view_counts = 7;
 */
export const IntMapEntryRef = builder
  .objectRef<{ key: string; value: number }>('IntMapEntry')
  .implement({
    description: 'Key-value pair for the map field viewCounts of INT32.',
    fields: (t) => ({
      key: t.exposeString('key', { nullable: false }),
      value: t.expose('value', { type: 'Int', nullable: false }),
    }),
  });

/**
 * Map field with scalar value type.
 * Maps tag names to view counts.
 *
 * @generated from field: map<string, int32> view_counts = 7;
 */
export const IntMapEntryInputRef = builder
  .inputRef<{ key: string; value: number }>('IntMapEntryInput')
  .implement({
    description: 'Key-value pair for the map field viewCounts of INT32.',
    fields: (t) => ({
      key: t.string({ required: true }),
      value: t.field({ type: 'Int', required: true }),
    }),
  });
