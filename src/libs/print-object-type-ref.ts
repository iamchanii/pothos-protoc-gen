import {
  type DescEnum,
  type DescField,
  type DescMessage,
  ScalarType,
} from '@bufbuild/protobuf';
import type { GeneratedFile, Printable } from '@bufbuild/protoplugin';
import { pascalCase } from 'change-case';
import { addDeprecatedReasonField } from './add-deprecated-reason-field.js';
import { addDescriptionField } from './add-description-field.js';
import { addNullableField } from './add-nullable-field.js';
import { getDescriptorName } from './get-descriptor-name.js';
import { getFieldType } from './get-field-type.js';
import { importBuilder, importEncodeBase64 } from './import-builder.js';
import { importEnumFromJson } from './import-enum-from-json.js';
import {
  importSchemaFromProto,
  importShapeFromProto,
} from './import-shape-from-proto.js';

export function printObjectTypeRef(f: GeneratedFile, message: DescMessage) {
  const messageName = getDescriptorName(message);

  f.print(f.jsDoc(message));
  f.print`${f.export('const', `${messageName}Ref`)} = ${importBuilder(f)}.objectRef<${importShapeFromProto(f, message)}>('${messageName}').implement({`;
  addDescriptionField(f, message, '  ');
  f.print`  fields: t => ({`;
  f.print`    _typeName: t.exposeString('$typeName'),`;

  for (const field of message.fields) {
    f.print(f.jsDoc(field, '    '));
    f.print`    ${field.localName}: t.field({`;
    const fieldType = getFieldType(field);
    f.print`      type: ${JSON.stringify(fieldType)},`;
    addDescriptionField(f, field, '      ');
    addDeprecatedReasonField(f, field, '      ');
    addNullableField(f, field, '      ');
    f.print`      resolve: ${getFieldResolveExpr(field)},`;
    f.print`    }),`;
  }

  if (message.field.id) {
    f.print`    rawId: t.field({`;
    f.print`      type: 'String',`;
    f.print`      resolve: (parent) => String(parent.id),`;
    f.print`    }),`;
  }

  f.print`  }),`;
  f.print`});`;
  f.print();

  function getFieldResolveExpr(field: DescField): Printable {
    if (field.localName === 'id') {
      const typeName = pascalCase(field.parent.typeName);

      return [
        '(parent) => ',
        importEncodeBase64(f),
        `(\`${typeName}:\${String(parent.id)}\`)`,
      ];
    }

    if (field.oneof) {
      return [
        '(parent) => {',
        `const oneofVal = parent.${field.oneof.localName}.value;`,
        `return parent.${field.oneof.localName}.case === '${field.localName}'`,
        ' ? ',
        resolveValueExpr(f, field, 'oneofVal'),
        ': null',
        '}',
      ];
    }

    if (field.fieldKind === 'map') {
      // map 타입의 경우 내부 value에 대해 별도 처리
      let valueResolver: Printable = '';
      if (
        field.mapKind === 'enum' ||
        (field.mapKind === 'scalar' && isBigIntType(field.scalar))
      ) {
        valueResolver = resolveValueExpr(f, field, 'value');
      } else if (field.mapKind === 'scalar') {
        valueResolver = 'value';
      } else {
        // message인 경우에도 그대로 반환(추가 변환이 필요한 경우 수정)
        valueResolver = 'value';
      }
      return [
        `(parent) => Object.entries(parent.${field.localName}).map(([key, value]) => ({ key: String(key), value: `,
        valueResolver,
        ' }))',
      ];
    }

    if (field.fieldKind === 'enum') {
      return [
        '(parent) => ',
        resolveValueExpr(f, field, `parent.${field.localName}`),
      ];
    }

    if (field.fieldKind === 'scalar') {
      return [
        '(parent) => ',
        resolveValueExpr(f, field, `parent.${field.localName}`),
      ];
    }

    if (field.fieldKind === 'list') {
      if (field.listKind === 'scalar') {
        return [
          `(parent) => parent.${field.localName}.map(value => `,
          resolveValueExpr(f, field, 'value'),
          ')',
        ];
      }
      if (field.listKind === 'enum') {
        return [
          `(parent) => parent.${field.localName}.map(value => `,
          resolveValueExpr(f, field, 'value'),
          ')',
        ];
      }
      return `(parent) => parent.${field.localName}`;
    }

    return `(parent) => parent.${field.localName}`;
  }

  /**
   * resolveValueExpr:
   * - BigInt 타입인 경우는 String()으로 감싼다.
   * - enum 타입인 경우 getEnumValueResolveExpr를 호출한다.
   * - 그 외의 경우는 그대로 반환한다.
   */
  function resolveValueExpr(
    f: GeneratedFile,
    field: DescField,
    valueExpr: string,
  ): Printable {
    if (
      (field.fieldKind === 'scalar' ||
        (field.fieldKind === 'list' && field.listKind === 'scalar')) &&
      isBigIntType(field.scalar)
    ) {
      return [`(${valueExpr})?.toString()`];
    }
    if (
      field.fieldKind === 'enum' ||
      (field.fieldKind === 'list' && field.listKind === 'enum')
    ) {
      return getEnumValueResolveExpr(
        f,
        field as DescField & { enum: DescEnum },
        valueExpr,
      );
    }
    return [valueExpr];
  }

  /**
   * getEnumValueResolveExpr:
   * - 주어진 enum 필드의 값을 가져와 해당 enum 매핑에서 이름을 반환하는 표현식을 생성한다.
   */
  function getEnumValueResolveExpr(
    f: GeneratedFile,
    field: DescField & { enum: DescEnum },
    valueExpr: string,
  ): Printable {
    return [
      importEnumFromJson(f),
      '(',
      importSchemaFromProto(f, field.enum),
      `, ${valueExpr})`,
    ];
  }
}

function isBigIntType(scalarType: ScalarType) {
  return [
    ScalarType.INT64,
    ScalarType.UINT64,
    ScalarType.SINT64,
    ScalarType.FIXED64,
    ScalarType.SFIXED64,
  ].includes(scalarType);
}
