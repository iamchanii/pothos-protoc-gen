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

## `disable_process_id_field`

Optional. When set to `true`, disables the automatic processing of ID fields in the generated code. 

By default, the plugin processes fields named 'id' by automatically transforming them into GraphQL's 'ID' scalar type. The transformation encodes the original ID value into a Base64 string in the format `typeName:originalId`. For example, if a `User` message has an ID of `123`, it would be encoded as `VXNlcjoxMjM=` (Base64 for "User:123"). This follows the GraphQL convention for globally unique identifiers.

This encoding format is particularly beneficial when working with GraphQL clients that perform data normalization, such as Relay or Apollo Client. These clients can use the globally unique identifiers to efficiently cache and normalize data across your entire GraphQL schema, improving application performance and state management.

### Example

```yaml
plugins:
  - local: ./node_modules/.bin/pothos-protoc-gen
    out: ./out
    opt:
      - disable_process_id_field=true
```

## `disable_add_raw_id_field`

Optional. When set to `true`, prevents the plugin from adding raw ID fields to the generated GraphQL types. By default, the plugin adds raw ID fields to enhance the schema's functionality.

When ID fields are processed (as described in `disable_process_id_field`), the original ID values are encoded into Base64 strings. The `rawId` field provides direct access to the original, unencoded ID value from the message. This is particularly useful when you need to reference the original ID for database queries, external API calls, or any scenario where you need the actual identifier value rather than the encoded GraphQL ID.

### Example

```yaml
plugins:
  - local: ./node_modules/.bin/pothos-protoc-gen
    out: ./out
    opt:
      - disable_add_raw_id_field=true
```