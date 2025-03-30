import { builder } from '../builder.js';

/**
 * Metadata as key-value pairs
 *
 * @generated from field: map<string, string> metadata = 9 [deprecated = true];
 * @deprecated
 */
export const StringMapEntryRef = builder
  .objectRef<{ key: string; value: string }>('StringMapEntry')
  .implement({
    description: 'Key-value pair for the map field metadata of STRING.',
    fields: (t) => ({
      key: t.exposeString('key', { nullable: false }),
      value: t.expose('value', { type: 'String', nullable: false }),
    }),
  });

/**
 * Map type field
 *
 * @generated from field: map<string, string> metadata = 6;
 */
export const StringMapEntryInputRef = builder
  .inputRef<{ key: string; value: string }>('StringMapEntryInput')
  .implement({
    description: 'Key-value pair for the map field metadata of STRING.',
    fields: (t) => ({
      key: t.string({ required: true }),
      value: t.field({ type: 'String', required: true }),
    }),
  });
