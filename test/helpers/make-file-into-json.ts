import { toJson } from '@bufbuild/protobuf';
import {
  type CodeGeneratorResponse_File,
  CodeGeneratorResponse_FileSchema,
} from '@bufbuild/protobuf/wkt';

export function makeFileIntoJson(file: CodeGeneratorResponse_File) {
  return toJson(CodeGeneratorResponse_FileSchema, file);
}
