import { create } from '@bufbuild/protobuf';
import {
  CodeGeneratorRequestSchema,
  file_google_protobuf_empty,
  file_google_protobuf_timestamp,
  file_google_protobuf_wrappers,
} from '@bufbuild/protobuf/wkt';
import { file_post_post } from '../out/post/post_pb.js';
import { file_user } from '../out/user_pb.js';
import { makePluginParameter } from './make-plugin-paramter.js';

const fileDescriptors = [
  file_google_protobuf_wrappers,
  file_google_protobuf_empty,
  file_google_protobuf_timestamp,
  file_user,
  file_post_post,
];

export function makeCodeGenerateRequest(
  parameter = makePluginParameter({ builderPath: '../builder' }),
) {
  const request = create(CodeGeneratorRequestSchema, {
    parameter,
  });

  for (const fileDescriptor of fileDescriptors) {
    request.protoFile.push(fileDescriptor.proto);
    request.fileToGenerate.push(fileDescriptor.proto.name);
  }

  return request;
}
