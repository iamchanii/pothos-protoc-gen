import type { PluginOptions } from '../../src/plugin-options.js';

export function makePluginParameter(options: PluginOptions): string {
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

  return parameters.join(',');
}
