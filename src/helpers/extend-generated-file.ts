import type {
  GeneratedFile,
  ImportSymbol,
  Schema,
} from '@bufbuild/protoplugin';
import type { PluginOptions } from '../plugin-options.js';

/**
 * Extends a generated file with additional imports required for the Pothos schema integration.
 *
 * @param schema - The schema containing plugin options
 * @param f - The generated file to extend
 *
 * @remarks
 * This function sets up important imports on the generated file:
 * 1. Imports the GraphQL schema builder from the configured builder path
 * 2. Imports the enumFromJson utility from @bufbuild/protobuf for enum handling
 * 3. Imports the Client type from @connectrpc/connect for RPC client integration
 */
export function extendGeneratedFile(
  schema: Schema<PluginOptions>,
  f: GeneratedFile,
) {
  f.importPothosBuilder = f.import('builder', schema.options.builderPath);
  f.importEnumFromJson = f.import('enumFromJson', '@bufbuild/protobuf');
  f.importConnectRpcClientType = f.import(
    'Client',
    '@connectrpc/connect',
    true,
  );
}

declare module '@bufbuild/protoplugin' {
  export interface GeneratedFile {
    importPothosBuilder: ImportSymbol;
    importEnumFromJson: ImportSymbol;
    importConnectRpcClientType: ImportSymbol;
  }
}
