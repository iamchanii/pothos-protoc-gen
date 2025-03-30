import type { Client } from '@connectrpc/connect';
import type { PostService } from './post/post_pb.js';
import type { UserService } from './user_pb.js';

export * from './user_pothos.js';
export * from './post/post_pothos.js';
export * from './google/protobuf/timestamp_pothos.js';
export * from './google/protobuf/empty_pothos.js';
export * from './generated-map-entries.js';
export interface GeneratedPothosContext {
  userV1UserService: Client<typeof UserService>;
  userV1UserServiceRequestHeaders?: HeadersInit;
  postV1PostService: Client<typeof PostService>;
  postV1PostServiceRequestHeaders?: HeadersInit;
}
