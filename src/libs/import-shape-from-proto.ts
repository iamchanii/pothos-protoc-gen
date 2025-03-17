import type { DescEnum, DescMessage, DescService } from '@bufbuild/protobuf';
import type { GeneratedFile } from '@bufbuild/protoplugin';

export function importShapeFromProto(
  f: GeneratedFile,
  descriptor: DescEnum | DescMessage,
  typeOnly = true,
) {
  const importSymbol = f.importShape(descriptor);

  Object.assign(importSymbol, {
    from: `@/gen/proto/${descriptor.file.name}_pb.js`,
    typeOnly,
  });

  return importSymbol;
}

export function importSchemaFromProto(
  f: GeneratedFile,
  descriptor: DescEnum | DescMessage | DescService,
) {
  const importSymbol = f.importSchema(descriptor);

  Object.assign(importSymbol, {
    from: `@/gen/proto/${descriptor.file.name}_pb.js`,
  });

  return importSymbol;
}
