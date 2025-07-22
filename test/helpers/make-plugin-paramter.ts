import type { PluginOptions } from '../../src/plugin-options.js';

export function makePluginParameter(options: Partial<PluginOptions>): string {
  const parameters: string[] = [];

  if (options.builderPath) {
    parameters.push(`builder_path=${options.builderPath}`);
  }

  if (options.includeServices) {
    for (const service of options.includeServices) {
      parameters.push(`include_service=${service}`);
    }
  }

  if (options.queryMethods) {
    for (const method of options.queryMethods) {
      parameters.push(`query_method=${method}`);
    }
  }

  if (options.mutationMethods) {
    for (const method of options.mutationMethods) {
      parameters.push(`mutation_method=${method}`);
    }
  }

  if (options.disableProcessIdField) {
    parameters.push('disable_process_id_field=true');
  }

  if (options.disableAddRawIdField) {
    parameters.push('disable_add_raw_id_field=true');
  }

  if (options.removeTypeName) {
    parameters.push('remove_type_name=true');
  }

  if (options.printPreamble) {
    parameters.push('print_preamble=true');
  }

  return parameters.join(',');
}
