# Installation

## Install pothos-protoc-gen

To install pothos-protoc-gen, run one of the following commands:

::: code-group

```sh [npm]
npm install pothos-protoc-gen
```

```sh [pnpm]
pnpm add pothos-protoc-gen
```

```sh [yarn]
yarn add pothos-protoc-gen
```

```sh [bun]
bun add pothos-protoc-gen
```

:::

## Add plugin

Update or create a `buf.gen.yaml` file in your project root to configure Buf for code generation:

```yaml
version: v2
plugins:
  - local: ./node_modules/.bin/protoc-gen-es
    out: ./out
  - local: ./node_modules/.bin/pothos-protoc-gen
    out: ./out
    strategy: all # Required
```

After configuring your `buf.gen.yaml` file, run the following command to generate the code:

```sh
buf generate
```

## Setup schema

```ts [schema.ts]
import { builder } from '../path/to/builder';
import '../path/to/out/pothos';

builder.queryType();
builder.mutationType();

export const schema = builder.toSchema();
```
