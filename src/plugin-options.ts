import type { JsonReadOptions, JsonWriteOptions } from '@bufbuild/protobuf';

type RawPluginOptions = { key: string; value: string }[];

export interface PluginOptions {
  builderPath: string;
  queryMethods: Set<string>;
  mutationMethods: Set<string>;
  includeServices: Set<string>;
  disableProcessIdField: boolean;
  disableAddRawIdField: boolean;
  printPreamble: boolean;
  jsonOptions: JsonWriteOptions & JsonReadOptions;
  jsonMessages: Set<string>;
}

/**
 * Parses the raw plugin options into a structured PluginOptions object.
 *
 * @param rawOptions - The raw plugin options to parse
 * @returns A structured options object with processed values
 * @remarks
 * This function transforms a list of key-value pairs into a structured configuration
 * object. It handles special cases for Set collections and boolean flags, converting
 * them from their raw string representation to the appropriate data types.
 */
export function parseOptions(rawOptions: RawPluginOptions): PluginOptions {
  const result: PluginOptions = {
    builderPath: '',
    queryMethods: new Set(),
    mutationMethods: new Set(),
    includeServices: new Set(),
    disableProcessIdField: false,
    disableAddRawIdField: false,
    printPreamble: false,
    jsonOptions: {
      alwaysEmitImplicit: false,
      enumAsInteger: false,
      useProtoFieldName: false,
      ignoreUnknownFields: false,
    },
    jsonMessages: new Set(),
  };

  for (const { key, value } of rawOptions) {
    if (key === 'builder_path') {
      result.builderPath = value;
    }

    if (key === 'query_method') {
      result.queryMethods.add(value);
    }

    if (key === 'mutation_method') {
      result.mutationMethods.add(value);
    }

    if (key === 'include_service') {
      result.includeServices.add(value);
    }

    if (key === 'disable_process_id_field') {
      result.disableProcessIdField = true;
    }

    if (key === 'disable_add_raw_id_field') {
      result.disableAddRawIdField = true;
    }

    if (key === 'json_options') {
      if (value.includes('always_emit_implicit')) {
        result.jsonOptions.alwaysEmitImplicit = true;
      }

      if (value.includes('enum_as_integer')) {
        result.jsonOptions.enumAsInteger = true;
      }

      if (value.includes('use_proto_field_name')) {
        result.jsonOptions.useProtoFieldName = true;
      }

      if (value.includes('ignore_unknown_fields')) {
        result.jsonOptions.ignoreUnknownFields = true;
      }
    }

    if (key === 'print_preamble') {
      result.printPreamble = true;
    }

    if (key === 'json_messages') {
      for (const message of value.split(',')) {
        result.jsonMessages.add(message);
      }
    }
  }

  return result;
}
