type RawPluginOptions = { key: string; value: string }[];

export interface PluginOptions {
  builderPath: string;
  queryMethods: Set<string>;
  mutationMethods: Set<string>;
  includeServices: Set<string>;
  disableProcessIdField: boolean;
  disableAddRawIdField: boolean;
  removeTypeName: boolean;
  printPreamble: boolean;
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
    removeTypeName: false,
    printPreamble: false,
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

    if (key === 'remove_type_name') {
      result.removeTypeName = true;
    }

    if (key === 'print_preamble') {
      result.printPreamble = true;
    }
  }

  return result;
}
