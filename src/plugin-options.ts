type RawPluginOptions = { key: string; value: string }[];

export interface PluginOptions {
  builderPath: string;
  queryMethods?: Set<string>;
  mutationMethods?: Set<string>;
  includeServices?: Set<string>;
}

export function parseOptions(rawOptions: RawPluginOptions): PluginOptions {
  const result = {
    builderPath: '',
    queryMethods: new Set(),
    mutationMethods: new Set(),
    includeServices: new Set(),
  } satisfies PluginOptions;

  for (const { key, value } of rawOptions) {
    switch (key) {
      case 'builder_path':
        result.builderPath = value;
        break;
      case 'query_method':
        result.queryMethods.add(value);
        break;
      case 'mutation_method':
        result.mutationMethods.add(value);
        break;
      case 'include_service':
        result.includeServices.add(value);
        break;
    }
  }

  return result;
}
