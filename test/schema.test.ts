import { printSchema } from 'graphql';
import { expect, test } from 'vitest';
import { schema } from './schema.ts';

test('Print schema', () => {
  const data = printSchema(schema);

  return expect(data).toMatchFileSnapshot('schema.graphql');
});
