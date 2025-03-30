# Configurations

This document outlines the available configuration options for the `pothos-protoc-gen` plugin when used with the Buf CLI.

## `builder_path`

**Required.** Specifies the path to the Pothos schema builder module. This option allows you to customize where the generated code should import the schema builder from.

The specified path should export a [`SchemaBuilder`](https://pothos-graphql.dev/docs/guide/schema-builder) instance named `builder`. This is a fundamental requirement as all generated code will import and use this builder to define GraphQL types and operations.

### Example

```yaml
plugins:
  - local: ./node_modules/.bin/pothos-protoc-gen
    out: ./out
    opt:
      - builder_path=../path/to/builder.js
      # Optional. Specifies the file extension to use for imports in the generated code.
      # You can set this value to `js`, `ts`, or `none` depending on your project configuration.
      - import_extension=js
```

## `query_method`

Optional. Specifies which RPC methods should be exposed as GraphQL queries. You can use this option multiple times to include different methods.

By default, RPCs with names starting with "list", "get", or "batchget" are automatically exposed as GraphQL queries.

### Example

```yaml
plugins:
  - local: ./node_modules/.bin/pothos-protoc-gen
    out: ./out
    opt:
      - query_method=GetUser
      - query_method=user.userService.ListUsers
```

## `mutation_method`

Optional. Specifies which RPC methods should be exposed as GraphQL mutations. You can use this option multiple times to include different methods.

### Example

```yaml
plugins:
  - local: ./node_modules/.bin/pothos-protoc-gen
    out: ./out
    opt:
      - mutation_method=CreateUser
      - mutation_method=user.userService.UpdateUser
```

## `include_service`

Optional. Specifies which services to include in the generated code. If not specified, all services will be included. You can use this option multiple times to include specific services.

### Example

```yaml
plugins:
  - local: ./node_modules/.bin/pothos-protoc-gen
    out: ./out
    opt:
      - include_service=UserService
      - include_service=product.ProductService
```