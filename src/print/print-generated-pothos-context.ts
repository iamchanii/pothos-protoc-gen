import type { DescService } from '@bufbuild/protobuf';
import type { Schema } from '@bufbuild/protoplugin';
import { getPothosIndexGeneratedFile } from '../helpers/generated-file.ts';
import {
  getServiceFieldName,
  getServiceRequestHeadersFieldName,
} from '../helpers/get-service-name.ts';
import type { PluginOptions } from '../plugin-options.ts';

/**
 * Generates a Pothos GraphQL context interface for gRPC services.
 *
 * @param schema - The schema containing plugin options
 * @param services - An iterable of service descriptors
 * @returns Nothing, but prints the generated interface to a file
 * @remarks
 * This function creates a TypeScript interface that includes:
 * - For each service, a field for the ConnectRPC client
 * - For each service, an optional field for request headers
 * The output is written to the Pothos index generated file.
 */
export function printGeneratedPothosContext(
  schema: Schema<PluginOptions>,
  services: Iterable<DescService>,
) {
  const f = getPothosIndexGeneratedFile(schema);

  f.print`${f.export('interface', 'GeneratedPothosContext')} {`;

  for (const service of services) {
    const indent = '  '; // 2 spaces
    const serviceFieldName = getServiceFieldName(service);
    const serviceRequestHeadersFieldName =
      getServiceRequestHeadersFieldName(service);
    f.print`${indent}${serviceFieldName}: ${f.importConnectRpcClientType}<typeof ${f.importSchema(service, true)}>;`;
    f.print`${indent}${serviceRequestHeadersFieldName}?: HeadersInit;`;
  }

  f.print`}`;
}
