import { builder } from './builder.ts';
import './out/generated-pothos.ts';

builder.queryType();
builder.mutationType();

export const schema = builder.toSchema();
