# Getting Started

<div align="center">
  <img src="/logo.png" width="160">
</div>

**pothos-protoc-gen** is a [Buf plugin](https://buf.build/docs/cli/buf-plugins/overview/) that generates TypeScript code for creating a Protobuf-first GraphQL schema using [Pothos GraphQL](https://pothos-graphql.dev/).

This plugin works with [protoc-gen-es](https://github.com/bufbuild/protobuf-es) to transform your Protocol Buffer definitions into a fully-typed GraphQL schema.

## Why pothos-protoc-gen?

When building GraphQL APIs that work with Protocol Buffers, manually creating GraphQL types that match your Protobuf definitions can be tedious and error-prone. `pothos-protoc-gen` automates this process by:

- **Maintaining type consistency**: Ensures your GraphQL schema accurately reflects your Protobuf definitions
- **Reducing boilerplate**: Automatically generates the TypeScript code needed to build your GraphQL schema
- **Improving developer experience**: Leverages Pothos GraphQL's type-safety while working with Protocol Buffers
- **Simplifying updates**: When your Protobuf definitions change, regenerate your code to keep everything in sync

This approach provides a clean, type-safe bridge between your Protocol Buffer services and GraphQL API, while minimizing manual code maintenance.
