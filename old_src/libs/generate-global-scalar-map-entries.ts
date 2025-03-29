import { ScalarType } from '@bufbuild/protobuf';
import type { Schema } from '@bufbuild/protoplugin';
import { pascalCase } from 'change-case';
import { mapProtoToGraphQLScalar } from './get-field-type.js';
import { globalScalarMapEntries } from './global-scalar-map-registry.js';
import { importBuilder } from './import-builder.js';

function mapGraphQLScalarToTsPrimitive(scalar: string) {
  switch (scalar) {
    case 'String':
      return 'string';
    case 'Int':
    case 'Float':
      return 'number';
    case 'Boolean':
      return 'boolean';
    default:
      return 'never';
  }
}

export function getScalarMapEntryOutputTypeName(scalarType: ScalarType) {
  const scalarName = pascalCase(ScalarType[scalarType]);
  const entryTypeName = `${scalarName}MapEntry`;

  return entryTypeName;
}

export function getScalarMapEntryInputTypeName(scalarType: ScalarType) {
  const scalarName = pascalCase(ScalarType[scalarType]);
  const entryTypeName = `${scalarName}MapEntryInput`;

  return entryTypeName;
}

export function generateGlobalScalarMapEntries(schema: Schema) {
  const f = schema.generateFile('global-scalar-map-entries.ts');
  const outputProperties: string[] = [];
  const inputProperties: string[] = [];

  for (const [groupKey, entry] of globalScalarMapEntries) {
    // groupKey 예: "scalar:Int32" → entryTypeName: "Int32MapEntry"
    const parts = groupKey.split(':'); // ["scalar", "Int32"]
    const valueType = mapProtoToGraphQLScalar(entry.field.scalar);
    const primitiveType = mapGraphQLScalarToTsPrimitive(valueType);

    // 출력용 Entry 타입 생성 (objectType)
    const outputTypeName = getScalarMapEntryOutputTypeName(parts[1] as never);
    f.print`${f.export('const', `${outputTypeName}Ref`)} = ${importBuilder(f)}.objectRef<{ key: string; value: ${primitiveType} }>('${outputTypeName}').implement({`;
    f.print`  fields: t => ({`;
    f.print`    key: t.exposeString('key', { nullable: false }),`;
    f.print`    value: t.expose('value', { type: ${JSON.stringify(valueType)}, nullable: false }),`;
    f.print`  }),`;
    f.print`});`;
    f.print();

    // 입력용 Entry 타입 생성 (inputRef)
    const inputTypeName = getScalarMapEntryInputTypeName(parts[1] as never);
    f.print`${f.export('const', `${inputTypeName}Ref`)} = ${importBuilder(f)}.inputRef('${inputTypeName}').implement({`;
    f.print`  fields: t => ({`;
    f.print`    key: t.string({ required: true }),`;
    f.print`    value: t.field({ type: ${JSON.stringify(valueType)}, required: false }),`;
    f.print`  }),`;
    f.print`});`;
    f.print();

    outputProperties.push(
      `  ${outputTypeName}: { key: string; value: ${primitiveType}; };`,
    );

    inputProperties.push(
      `  ${inputTypeName}: { key: string; value: ${primitiveType}; };`,
    );
  }

  f.print`${f.export('interface', 'GlobalScalarMapEntriesOutput')} {`;
  f.print(outputProperties);
  f.print`}`;
  f.print();

  f.print`${f.export('interface', 'GlobalScalarMapEntriesInput')} {`;
  f.print(inputProperties);
  f.print`}`;
  f.print();
}
