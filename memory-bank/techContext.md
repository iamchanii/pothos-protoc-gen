# Technical Context: pothos-protoc-gen

## Technology Stack

### Core Technologies
- **TypeScript**: The plugin is written in TypeScript and generates TypeScript code
- **Protocol Buffers**: The input format that defines the data models and services
- **Pothos GraphQL**: The code-first GraphQL schema builder that the generated code targets
- **@bufbuild/protobuf**: Library for working with Protocol Buffers in TypeScript
- **@bufbuild/protoplugin**: Framework for building Protocol Buffer compiler plugins

### Development Tools
- **pnpm**: Package manager used for dependency management
- **Biome**: Used for code formatting and linting
- **Lefthook**: Git hooks manager for running pre-commit checks
- **TypeScript**: For static type checking and compilation

## Project Structure

```
pothos-protoc-gen/
├── src/                  # Source code
│   ├── index.ts          # Main entry point
│   └── libs/             # Core functionality modules
│       ├── collect*.ts   # Collection of protobuf information
│       ├── generate*.ts  # Code generation modules
│       ├── print*.ts     # Code printing utilities
│       └── ...           # Other utility modules
├── package.json          # Project metadata and dependencies
├── tsconfig.json         # TypeScript configuration
└── ...                   # Other configuration files
```

## Dependencies

### Production Dependencies
- **@bufbuild/protobuf (^2.2.3)**: Core library for working with Protocol Buffers
- **@bufbuild/protoplugin (^2.2.3)**: Framework for building protoc plugins
- **change-case (^5.4.4)**: Utility for converting between different case styles
- **remeda (^2.21.2)**: Utility library for functional programming

### Development Dependencies
- **@biomejs/biome (^1.9.4)**: Code formatting and linting tool
- **@total-typescript/tsconfig (^1.0.4)**: TypeScript configuration presets
- **@types/node (^22.13.10)**: TypeScript type definitions for Node.js
- **lefthook (^1.11.3)**: Git hooks manager
- **typescript (^5.8.2)**: TypeScript compiler

## Build and Deployment

### Build Process
1. Clean the dist directory: `pnpm run clean`
2. Compile TypeScript to JavaScript: `pnpm run build`
3. The compiled code is output to the `dist` directory

### Distribution
- The package is distributed as an npm package
- Only the `dist` directory is included in the published package
- The package provides a binary executable: `pothos-protoc-gen`

## Technical Constraints

### Runtime Environment
- Requires Node.js or Bun as indicated by the shebang in index.ts
- Designed to be run as a protoc plugin

### Integration Requirements
- Must be compatible with the protoc compiler
- Generated code must be compatible with Pothos GraphQL
- Must handle all Protocol Buffer types and features correctly

## Technical Decisions

### ES Modules
- The project uses ES Modules (`"type": "module"` in package.json)
- Import/export syntax is used throughout the codebase

### Code Generation Approach
- Code is generated as TypeScript rather than GraphQL SDL
- Generated code is designed to be imported and used in a TypeScript project
- The plugin focuses on generating Pothos builder code rather than raw GraphQL types

### Plugin Configuration
- Configuration is provided through plugin options passed to protoc
- Options include specifying which methods should be queries vs mutations
- Service filtering is supported through the `include_service` option
