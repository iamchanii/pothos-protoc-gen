// @generated by protoc-gen-es v2.2.5
// @generated from file user.proto (package user.v1, syntax proto3)
/* eslint-disable */

import type { JsonObject, Message } from '@bufbuild/protobuf';
import type {
  GenEnum,
  GenFile,
  GenMessage,
  GenService,
} from '@bufbuild/protobuf/codegenv1';
import type { EmptySchema } from './google/protobuf/empty_pb';
import type { Timestamp } from './google/protobuf/timestamp_pb';

/**
 * Describes the file user.proto.
 */
export declare const file_user: GenFile;

/**
 * Message representing a user.
 *
 * @generated from message user.v1.User
 */
export declare type User = Message<'user.v1.User'> & {
  /**
   * @generated from field: string id = 1;
   */
  id: string;

  /**
   * @generated from field: string name = 2;
   */
  name: string;

  /**
   * @generated from field: user.v1.UserStatus status = 3;
   */
  status: UserStatus;

  /**
   * @generated from field: google.protobuf.Timestamp created_at = 4;
   */
  createdAt?: Timestamp;

  /**
   * Map field with scalar value type.
   *
   * @generated from field: map<string, int32> login_counts = 5;
   */
  loginCounts: { [key: string]: number };

  /**
   * Map field with enum value type.
   *
   * @generated from field: map<string, user.v1.UserStatus> account_settings = 6;
   */
  accountSettings: { [key: string]: UserStatus };

  /**
   * Address field with message value type.
   * Deprecated field, should not be used in new code.
   *
   * @generated from field: user.v1.User.Address address = 7 [deprecated = true];
   * @deprecated
   */
  address?: User_Address;

  /**
   * Map field with message value type.
   *
   * @generated from field: map<string, user.v1.User.Address> addresses = 8;
   */
  addresses: { [key: string]: User_Address };

  /**
   * @generated from field: google.protobuf.Struct metadata = 9;
   */
  metadata?: JsonObject;
};

/**
 * Describes the message user.v1.User.
 * Use `create(UserSchema)` to create a new message.
 */
export declare const UserSchema: GenMessage<User>;

/**
 * Nested message representing an address.
 *
 * @generated from message user.v1.User.Address
 */
export declare type User_Address = Message<'user.v1.User.Address'> & {
  /**
   * @generated from field: string street = 1;
   */
  street: string;

  /**
   * @generated from field: string city = 2;
   */
  city: string;

  /**
   * @generated from field: string state = 3;
   */
  state: string;

  /**
   * @generated from field: string postal_code = 4;
   */
  postalCode: string;

  /**
   * @generated from field: user.v1.User.Address.AddressType type = 5;
   */
  type: User_Address_AddressType;
};

/**
 * Describes the message user.v1.User.Address.
 * Use `create(User_AddressSchema)` to create a new message.
 */
export declare const User_AddressSchema: GenMessage<User_Address>;

/**
 * Nested enum within Address for address type.
 *
 * @generated from enum user.v1.User.Address.AddressType
 */
export enum User_Address_AddressType {
  /**
   * @generated from enum value: HOME = 0;
   */
  HOME = 0,

  /**
   * @generated from enum value: WORK = 1;
   */
  WORK = 1,

  /**
   * @generated from enum value: OTHER = 2;
   */
  OTHER = 2,
}

/**
 * Describes the enum user.v1.User.Address.AddressType.
 */
export declare const User_Address_AddressTypeSchema: GenEnum<User_Address_AddressType>;

/**
 * Message for querying users. References User indirectly.
 *
 * @generated from message user.v1.UserQuery
 */
export declare type UserQuery = Message<'user.v1.UserQuery'> & {
  /**
   * @generated from field: string search_term = 1;
   */
  searchTerm: string;

  /**
   * @generated from field: int32 page_number = 2;
   */
  pageNumber: number;

  /**
   * @generated from field: int32 results_per_page = 3;
   */
  resultsPerPage: number;

  /**
   * @generated from field: google.protobuf.Timestamp start_date = 4;
   */
  startDate?: Timestamp;

  /**
   * @generated from field: google.protobuf.Timestamp end_date = 5;
   */
  endDate?: Timestamp;
};

/**
 * Describes the message user.v1.UserQuery.
 * Use `create(UserQuerySchema)` to create a new message.
 */
export declare const UserQuerySchema: GenMessage<UserQuery>;

/**
 * Message representing a list of users.
 *
 * @generated from message user.v1.UserList
 */
export declare type UserList = Message<'user.v1.UserList'> & {
  /**
   * @generated from field: repeated user.v1.User users = 1;
   */
  users: User[];

  /**
   * @generated from field: int32 total_users = 2;
   */
  totalUsers: number;
};

/**
 * Describes the message user.v1.UserList.
 * Use `create(UserListSchema)` to create a new message.
 */
export declare const UserListSchema: GenMessage<UserList>;

/**
 * Top-level enum for user status.
 *
 * @generated from enum user.v1.UserStatus
 */
export enum UserStatus {
  /**
   * @generated from enum value: UNKNOWN = 0;
   */
  UNKNOWN = 0,

  /**
   * @generated from enum value: ACTIVE = 1;
   */
  ACTIVE = 1,

  /**
   * @generated from enum value: INACTIVE = 2;
   */
  INACTIVE = 2,

  /**
   * @generated from enum value: BANNED = 3;
   */
  BANNED = 3,
}

/**
 * Describes the enum user.v1.UserStatus.
 */
export declare const UserStatusSchema: GenEnum<UserStatus>;

/**
 * Service with multiple RPC calls.
 *
 * @generated from service user.v1.UserService
 */
export declare const UserService: GenService<{
  /**
   * Retrieves a single user.
   *
   * @generated from rpc user.v1.UserService.GetUser
   */
  getUser: {
    methodKind: 'unary';
    input: typeof EmptySchema;
    output: typeof UserSchema;
  };
  /**
   * Retrieves a list of users based on query parameters.
   *
   * @generated from rpc user.v1.UserService.ListUsers
   */
  listUsers: {
    methodKind: 'unary';
    input: typeof UserQuerySchema;
    output: typeof UserListSchema;
  };
  /**
   * Creates a new user.
   *
   * @generated from rpc user.v1.UserService.CreateUser
   */
  createUser: {
    methodKind: 'unary';
    input: typeof UserSchema;
    output: typeof UserSchema;
  };
  /**
   * Deletes a user.
   *
   * @generated from rpc user.v1.UserService.DeleteUser
   */
  deleteUser: {
    methodKind: 'unary';
    input: typeof UserSchema;
    output: typeof EmptySchema;
  };
}>;
