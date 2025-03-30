import { expect, test } from 'vitest';
import { pothosProtocGenPlugin } from '../src/plugin.ts';
import { makeCodeGenerateRequest } from './helpers/make-code-generate-request.ts';
import { makeFileIntoJson } from './helpers/make-file-into-json.ts';
import { makePluginParameter } from './helpers/make-plugin-paramter.ts';

test('Generate files', () => {
  const request = makeCodeGenerateRequest(
    makePluginParameter({
      builderPath: '../builder',
      disableProcessIdField: true,
      disableAddRawIdField: true,
    }),
  );
  const response = pothosProtocGenPlugin.run(request);
  const files = response.file.map(makeFileIntoJson);

  expect(files).toMatchSnapshot();
});
