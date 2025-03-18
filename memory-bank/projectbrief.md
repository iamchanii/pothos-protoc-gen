# Project Brief: pothos-protoc-gen

## Overview
pothos-protoc-gen is a Protoc plugin that generates a Protobuf-first GraphQL schema. It enables developers to define their data models and services using Protocol Buffers (protobuf) and automatically generate corresponding GraphQL schema using the Pothos GraphQL schema builder.

## Core Purpose
The plugin bridges the gap between Protocol Buffers and GraphQL, allowing developers to maintain a single source of truth in their protobuf definitions while exposing the data through a GraphQL API.

## Key Features
- Generates TypeScript code for Pothos GraphQL schema from protobuf definitions
- Supports mapping protobuf services to GraphQL queries and mutations
- Handles protobuf message types, enums, and well-known type wrappers
- Provides options for customizing the generated GraphQL schema

## Target Users
- Developers building GraphQL APIs who prefer defining their data models in Protocol Buffers
- Teams working with gRPC services who want to expose the same functionality through GraphQL
- Projects that need to maintain consistency between different API interfaces

## Success Criteria
- Correctly generates valid Pothos GraphQL schema code from protobuf definitions
- Preserves all the type information and relationships defined in the protobuf files
- Provides a seamless developer experience with minimal manual intervention required
- Supports all common protobuf features and types
