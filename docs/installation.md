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
    # Required.
    # The plugin will not work if you choose a different option.
    strategy: all
    opts:
      # Required.
      # Ignores unnecessary type error warnings from the generated code.
      - ts_nocheck=true
```

You can customize the plugin's behavior by adding configuration options to your `buf.gen.yaml` file. For more details, see the [Configuration](./configuration.md) page.

After configuring your `buf.gen.yaml` file, run the following command to generate the code:

```sh
buf generate
```

## Setup [`SchemaBuilder`](https://pothos-graphql.dev/docs/guide/schema-builder)

To use the generated code with Pothos, you need to set up the `SchemaBuilder` with the generated context type. This plugin generates a `GeneratedPothosContext` interface that includes fields for each gRPC service client and optional request headers.

First, create your builder instance:

```ts
import SchemaBuilder from '@pothos/core';
import type { GeneratedPothosContext } from './path/to/out/generated-pothos';

// Create a new SchemaBuilder with the generated context type
export const builder = new SchemaBuilder<{
  Context: GeneratedPothosContext;
}>({});
```

Next, import the generated Pothos files in your schema definition:

```ts
import { builder } from './builder';
import './path/to/out/generated-pothos';

builder.queryType();
builder.mutationType();

export const schema = builder.toSchema();
```

You need to implement the context type in your GraphQL server setup. For example, with a minimal Yoga Server:

```ts
import { createClient } from '@connectrpc/connect';
import { createGrpcTransport } from '@connectrpc/connect-node';
import { createYoga } from 'graphql-yoga'
import { YourService } from './path/to/out/your_service_pb';
import { schema } from './path/to/schema';

// Set up your gRPC client(s)
const transport = createGrpcTransport({/* ... */});
const yourServiceClient = createClient(YourService, transport);

const yoga = createYoga({
  schema,
  context: async () => ({
    // Provide all service clients defined in GeneratedPothosContext
    yourService: yourServiceClient,
    // Optionally provide request headers for the service
    yourServiceRequestHeaders: {
      'x-api-key': 'your-api-key',
    },
  }),
})
```
