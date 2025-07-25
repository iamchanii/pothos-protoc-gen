import { type DescEnum, type DescField, ScalarType } from '@bufbuild/protobuf';
import type { GeneratedFile, Printable, Schema } from '@bufbuild/protoplugin';
import type { PluginOptions } from '../plugin-options.ts';

/**
 * Generates an expression for resolving a field on an object.
 *
 * @param f - The generated file object.
 * @param field - The field descriptor.
 * @returns An expression for resolving the field.
 * @remarks This function handles different field types, including oneof, map, enum, scalar, and list.
 */
export function getObjectFieldResolverExpression(
  schema: Schema<PluginOptions>,
  f: GeneratedFile,
  field: DescField,
): Printable {
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

  switch (field.fieldKind) {
    case 'map': {
      let valueResolver: Printable = '';

      if (
        field.mapKind === 'enum' ||
        (field.mapKind === 'scalar' && isBigIntScalarType(field.scalar))
      ) {
        valueResolver = resolveValueExpr(f, field, 'value');
      } else {
        valueResolver = 'value';
      }

      return [
        `(parent) => Object.entries(parent.${field.localName}).map(([key, value]) => ({ key: String(key), value: `,
        valueResolver,
        ' }))',
      ];
    }

    case 'enum':
    case 'scalar':
      return [
        '(parent) => ',
        resolveValueExpr(f, field, `parent.${field.localName}`),
      ];

    case 'list':
      switch (field.listKind) {
        case 'scalar':
        case 'enum':
          return [
            `(parent) => parent.${field.localName}.map(value => `,
            resolveValueExpr(f, field, 'value'),
            ')',
          ];
        default:
          return `(parent) => parent.${field.localName}`;
      }

    case 'message':
      if (schema.options.jsonMessages.has(field.message.typeName)) {
        return [
          '(parent) => ',
          f.runtime.fromJson,
          '(',
          f.importSchema(field.message),
          ', ',
          `parent.${field.localName}, {`,
          ` alwaysEmitImplicit: ${schema.options.jsonOptions.alwaysEmitImplicit},`,
          ` enumAsInteger: ${schema.options.jsonOptions.enumAsInteger},`,
          ` useProtoFieldName: ${schema.options.jsonOptions.useProtoFieldName},`,
          ` ignoreUnknownFields: ${schema.options.jsonOptions.ignoreUnknownFields},`,
          '})',
        ];
      }

      return `(parent) => parent.${field.localName}`;

    default:
      field satisfies never;
      throw new Error('Invalid field kind');
  }
}

function resolveValueExpr(
  f: GeneratedFile,
  field: DescField,
  valueExpr: string,
): Printable {
  if (
    (field.fieldKind === 'scalar' ||
      (field.fieldKind === 'list' && field.listKind === 'scalar')) &&
    isBigIntScalarType(field.scalar)
  ) {
    return [`(${valueExpr})?.toString()`];
  }

  if (
    field.fieldKind === 'enum' ||
    (field.fieldKind === 'list' && field.listKind === 'enum')
  ) {
    return getEnumValueResolveExpr(f, field.enum, valueExpr);
  }

  return [valueExpr];
}

function getEnumValueResolveExpr(
  f: GeneratedFile,
  enum_: DescEnum,
  valueExpr: string,
): Printable {
  return [f.importEnumFromJson, '(', f.importSchema(enum_), `, ${valueExpr})`];
}

function isBigIntScalarType(scalarType: ScalarType) {
  return [
    ScalarType.INT64,
    ScalarType.UINT64,
    ScalarType.SINT64,
    ScalarType.FIXED64,
    ScalarType.SFIXED64,
  ].includes(scalarType);
}
