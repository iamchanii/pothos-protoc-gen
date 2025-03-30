import { expect, test } from 'vitest';
import { pothosProtocGenPlugin } from '../src/plugin.js';
import { makeCodeGenerateRequest } from './helpers/make-code-generate-request.js';
import { makeFileIntoJson } from './helpers/make-file-into-json.js';

test('Generate files', () => {
  const request = makeCodeGenerateRequest();
  const response = pothosProtocGenPlugin.run(request);
  const files = response.file.map(makeFileIntoJson);

  expect(files).toMatchSnapshot('basic-plugin-run');
});
