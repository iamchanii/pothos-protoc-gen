import type { DescService } from '@bufbuild/protobuf';
import type { GeneratedFile } from '@bufbuild/protoplugin';
import { camelCase, pascalCase } from 'change-case';
import { importSchemaFromProto } from './import-shape-from-proto.js';

export function printContextInterface(
  f: GeneratedFile,
  fileName: string,
  services: DescService[],
) {
  const interfaceName = pascalCase(`${fileName}Context`);

  f.print`${f.export('interface', interfaceName)} {`;

  for (const service of services) {
    f.print(f.jsDoc(service, '  '));
    f.print`  ${camelCase(service.name)}?: ${f.import('Client', '@connectrpc/connect', true)}<typeof ${importSchemaFromProto(f, service)}>;`;
    f.print`  ${camelCase(`${service.name}RequestHeaders`)}?: HeadersInit`;
  }

  f.print`}`;
  f.print();
}
