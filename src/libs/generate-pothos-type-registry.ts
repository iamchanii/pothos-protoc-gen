import type { Schema } from '@bufbuild/protoplugin';
import { pascalCase } from 'change-case';
import { sort } from 'remeda';
import { normalizeFileName } from './normalize-file-name.js';

export function generatePothosTypeRegistry(schema: Schema) {
  const f = schema.generateFile('index.ts');
  const allFiles = sort(schema.files, (a, b) => a.name.localeCompare(b.name));

  const processed = new Set<string>();

  for (const file of allFiles) {
    const fileName = normalizeFileName(file);

    if (processed.has(fileName)) continue;
    processed.add(fileName);

    f.print(`import './${fileName}/index.js';`);
    f.print(`export * from './${fileName}/index.js';`);
    f.print();
  }

  // 전역 스칼라 map entry 타입 파일도 import 합니다.
  f.print(`import './global-scalar-map-entries.js';`);
  f.print(`export * from './global-scalar-map-entries.js';`);
  f.print();

  const contexts = allFiles
    .filter((file) => file.services.length > 0)
    .flatMap((file, index, array) => {
      const fileName = normalizeFileName(file);
      const importSymbol = f.import(
        pascalCase(`${fileName}Context`),
        `./${fileName}/index.js`,
        true,
      );

      if (array.length - 1 === index) {
        return importSymbol;
      }

      return [importSymbol, ', '];
    });

  f.print`${f.export('interface', 'GeneratedPothosContext')} extends ${contexts} {}`;
  f.print();
}
