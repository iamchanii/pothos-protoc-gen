# pothos-protoc-gen

A Protoc plugin that generates TypeScript code for creating a Protobuf-first GraphQL schema using [Pothos GraphQL](https://pothos-graphql.dev/). This plugin works with [protoc-gen-es](https://github.com/bufbuild/protobuf-es) to transform your Protocol Buffer definitions into a fully-typed GraphQL schema.

> [!WARNING]
> Work in progress. It is being used in production environments, but it includes very opinionated implementations.

## Installation

To install the package, run the following command:

```bash
npm install --save-dev pothos-protoc-gen
yarn add -D pothos-protoc-gen
pnpm add -D pothos-protoc-gen
bun add -D pothos-protoc-gen
```

## Setup with buf.gen.yaml

To set up this plugin with buf.gen.yaml, add the following to your `buf.gen.yaml` file:

```yaml
version: v2
plugins:
  - local: ./node_modules/.bin/protoc-gen-es
    out: ./src/gen/proto
    opt:
      - target=ts
      - import_extension=js
  - local: ./node_modules/.bin/pothos-protoc-gen
    out: ./src/gen/pothos
    strategy: all # Required
    include_imports: true # Optional
    include_wkt: true # Optional
```

## Available Options

The following options can be provided in buf.gen.yaml:

```yaml
plugins:
  - local: ./node_modules/.bin/pothos-protoc-gen
    out: ./src/gen/pothos
    opt:
      - query_method=GetUser      # Specify which methods should be queries
      - mutation_method=CreateUser # Specify which methods should be mutations
      - include_service=UserService # Specify which services to include
```

### Options Reference

- `query_method`: Specifies a method that should be exposed as a GraphQL query. Can be used multiple times. By default, RPCs starting with "list" or "get" or "batchget" are exposed as query type.
- `mutation_method`: Specifies a method that should be exposed as a GraphQL mutation. Can be used multiple times.
- `include_service`: Specifies a service to include in the generated code. Can be used multiple times to include specific services. If not specified, all services will be included.


## License

MIT
