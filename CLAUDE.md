# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

pothos-protoc-gen is a Buf plugin that generates TypeScript code for creating Protobuf-first GraphQL schemas using Pothos GraphQL. It transforms Protocol Buffer definitions into fully-typed GraphQL schema code.

## Essential Commands

```bash
# Build the project
pnpm run build

# Run tests
pnpm test

# Run a specific test file
pnpm test src/print/enum.test.ts

# Clean build artifacts
pnpm run clean

# Run documentation site locally
pnpm run docs:dev

# Format and lint (handled by git hooks, but can run manually)
pnpm exec @biomejs/biome check --write .
```

## High-Level Architecture

The codebase follows a two-phase architecture:

### 1. Collection Phase (`src/collect/`)
- `collect.ts` orchestrates the collection of all Protobuf descriptors
- Specialized collectors handle different descriptor types (enums, services, methods, messages, map entries)
- Builds a structured representation of all relevant proto elements

### 2. Printing Phase (`src/print/`)
- Individual print functions generate TypeScript code for each GraphQL construct
- Handles enum types, object types, input types, map entries, and service methods
- Manages imports and generates the final output files

### Key Architectural Decisions

1. **Plugin Entry**: `src/plugin.ts` is the executable entry point using `@bufbuild/protoplugin`
2. **Type Mapping**: Well-Known Types (WKT) are mapped to GraphQL scalars in `src/helpers/scalars.ts`
3. **Naming Strategy**: Consistent naming patterns (e.g., `${message}${field}Ref` for enums)
4. **Import Management**: Deferred import collection to handle circular dependencies

### Plugin Options

When working with plugin configuration:
- `builder_path`: Path to the Pothos builder instance (default: "./builder")
- `query_method`/`mutation_method`: Arrays of RPC method names to categorize
- `include_service`: Filter which services to process
- `disable_process_id_field`/`disable_add_raw_id_field`: Control ID field handling

### Testing Strategy

Tests use Vitest with example proto files in `example/`. When adding new features:
1. Add example proto definitions in `example/proto/`
2. Generate expected output using the plugin
3. Write tests comparing actual vs expected output

### Development Workflow

1. Make changes to the collection or printing logic
2. Run `pnpm test` to ensure tests pass
3. Build with `pnpm run build` before testing the plugin locally
4. Git hooks (via lefthook) will automatically format code on commit