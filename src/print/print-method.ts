import type { DescMethod } from '@bufbuild/protobuf';
import type { Schema } from '@bufbuild/protoplugin';
import { getGeneratedFile } from '../helpers/generated-file.js';
import { getDescriptorComments } from '../helpers/get-descriptor-comments.js';
import { getDescriptorDeprecationReason } from '../helpers/get-descriptor-deprecation-reason.js';
import { getDescriptorName } from '../helpers/get-descriptor-name.js';
import { getInputConstructor } from '../helpers/get-input-constructor.js';
import { getMethodFieldName } from '../helpers/get-method-field-name.js';
import {
  getServiceFieldName,
  getServiceRequestHeadersFieldName,
} from '../helpers/get-service-name.js';
import type { PluginOptions } from '../plugin-options.js';

/**
 * Generates and prints a GraphQL field for a gRPC method.
 *
 * This function processes a gRPC method descriptor and generates the corresponding
 * GraphQL query or mutation field with appropriate type definitions, arguments,
 * and resolver implementation.
 *
 * @param schema - Schema object containing plugin options and configuration
 * @param method - The gRPC method descriptor to process
 *
 * @returns Nothing, but writes generated code to the output file
 *
 * @remarks
 * The function determines whether to create a query or mutation based on naming conventions
 * and configuration options. It generates field definitions with proper types,
 * documentation, deprecation notices, and input arguments. The resolver implementation
 * connects to the appropriate gRPC client method in the context.
 */
function printMethod(schema: Schema<PluginOptions>, method: DescMethod) {
  const f = getGeneratedFile(schema, method.parent.file);
  const methodFieldName = getMethodFieldName(method);
  const builderMethod =
    checkMethodType() === 'query' ? 'queryField' : 'mutationField';

  f.print(f.jsDoc(method));
  f.print`${f.importPothosBuilder}.${builderMethod}('${methodFieldName}', t => t.field({`;

  const indent = '  '; // 2 spaces
  f.print(f.jsDoc(method.output, indent));
  f.print`${indent}type: ${JSON.stringify(getDescriptorName(method.output))},`;
  f.print`${indent}description: ${getDescriptorComments(method)},`;
  f.print`${indent}deprecationReason: ${getDescriptorDeprecationReason(method)},`;
  f.print`${indent}args: {`;
  {
    const indent = '    '; // 4 spaces
    f.print(f.jsDoc(method.input, indent));
    f.print`${indent}input: t.arg({`;
    f.print`${indent}  type: ${JSON.stringify(getDescriptorName(method.input, 'Input'))},`;
    f.print`${indent}  required: true,`;
    f.print`${indent}  description: ${getDescriptorComments(method.input)},`;
    f.print`${indent}}),`;
  }
  f.print`${indent}},`;
  f.print`${indent}resolve: (_root, { input }, context) => {`;
  {
    const indent = '    '; // 4 spaces
    const fieldName = getServiceFieldName(method.parent);
    const requestHeadersFieldName = getServiceRequestHeadersFieldName(
      method.parent,
    );

    f.print`${indent}if (!context.${fieldName}) throw new Error('${fieldName} is not provided.');`;
    f.print`${indent}return context.${fieldName}.${method.localName}(`;
    f.print`${indent}  ${getInputConstructor(f, method.input)}(input),`;
    f.print`${indent}  { headers: context.${requestHeadersFieldName} },`;
    f.print`${indent});`;
  }
  f.print`${indent}},`;
  f.print`}));`;
  f.print();

  /**
   * Determines whether a method should be a query or mutation based on various criteria.
   *
   * The determination is made by:
   * 1. Checking if the method name exists in queryMethods
   * 2. Checking if "TypeName.methodName" exists in queryMethods
   * 3. Checking if the method name exists in mutationMethods
   * 4. Checking if "TypeName.methodName" exists in mutationMethods
   * 5. If none of the above, defaults based on method name:
   *    - Methods starting with "list", "get", or "batchget" (case-insensitive) become queries
   *    - All other methods become mutations
   *
   * @returns Either 'query' or 'mutation' based on the determination
   *
   * @remarks
   * This function is used to categorize gRPC methods into GraphQL queries or mutations
   * when generating a GraphQL schema from Protocol Buffers.
   */
  function checkMethodType(): 'query' | 'mutation' {
    if (schema.options.queryMethods.has(method.name)) {
      return 'query';
    }

    if (
      schema.options.queryMethods.has(
        `${method.parent.typeName}.${method.name}`,
      )
    ) {
      return 'query';
    }

    if (schema.options.mutationMethods.has(method.name)) {
      return 'mutation';
    }

    if (
      schema.options.mutationMethods.has(
        `${method.parent.typeName}.${method.name}`,
      )
    ) {
      return 'mutation';
    }

    return /^(list|get|batchget)/.test(method.name.toLowerCase())
      ? 'query'
      : 'mutation';
  }
}

export function createPrintMethod(schema: Schema<PluginOptions>) {
  return (method: DescMethod) => {
    return printMethod(schema, method);
  };
}
