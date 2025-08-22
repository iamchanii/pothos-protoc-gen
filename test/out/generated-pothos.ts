import type { Client } from '@connectrpc/connect';
import type { BoardService } from './board_pb.js';
import type { UserService } from './user_pb.js';

export * from './board_pothos.ts';
export * from './generated-map-entries.ts';
export * from './google/protobuf/empty_pothos.ts';
export * from './google/protobuf/struct_pothos.ts';
export * from './google/protobuf/timestamp_pothos.ts';
export * from './user_pothos.ts';
export interface GeneratedPothosContext {
  userV1UserService: Client<typeof UserService>;
  userV1UserServiceRequestHeaders?: HeadersInit;
  boardV1BoardService: Client<typeof BoardService>;
  boardV1BoardServiceRequestHeaders?: HeadersInit;
}
