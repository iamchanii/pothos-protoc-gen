# Configurations

This document outlines the available configuration options for the `pothos-protoc-gen` plugin when used with the Buf CLI.

## `query_method`

Specifies which RPC methods should be exposed as GraphQL queries. You can use this option multiple times to include different methods.

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

Specifies which RPC methods should be exposed as GraphQL mutations. You can use this option multiple times to include different methods.

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

Specifies which services to include in the generated code. If not specified, all services will be included. You can use this option multiple times to include specific services.

### Example

```yaml
plugins:
  - local: ./node_modules/.bin/pothos-protoc-gen
    out: ./out
    opt:
      - include_service=UserService
      - include_service=product.ProductService
```