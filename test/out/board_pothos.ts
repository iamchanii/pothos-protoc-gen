// @generated by pothos-protoc-gen v0.1.1 with parameter "import_extension=js,ts_nocheck=true,builder_path=../builder.js"
// @generated from file board.proto (package board.v1, syntax proto3)
/* eslint-disable */
// @ts-nocheck

import { create, enumFromJson } from '@bufbuild/protobuf';
import { encodeBase64 } from '@pothos/core';
import { builder } from '../builder.js';
import type {
  Comment,
  Post,
  PostList,
  PostQuery,
  PostStatus,
  Post_Attachment,
} from './board_pb.js';
import {
  CommentSchema,
  PostQuerySchema,
  PostSchema,
  PostStatusSchema,
  Post_AttachmentSchema,
  Post_Attachment_AttachmentTypeSchema,
} from './board_pb.js';
import { makeGoogleProtobufTimestampInput } from './google/protobuf/timestamp_pothos.js';
import { makeUserV1UserInput } from './user_pothos.js';

/**
 * Top-level enum representing the status of a post.
 *
 * @generated from enum board.v1.PostStatus
 */
export const BoardV1PostStatusRef = builder.enumType('BoardV1PostStatus', {
  description: 'Top-level enum representing the status of a post.',
  values: {
    /**
     * @generated from enum value: UNKNOWN = 0;
     */
    UNKNOWN: {
      value: enumFromJson(PostStatusSchema, 'UNKNOWN'),
      description: undefined,
      deprecated: false,
    },
    /**
     * @generated from enum value: DRAFT = 1;
     */
    DRAFT: {
      value: enumFromJson(PostStatusSchema, 'DRAFT'),
      description: undefined,
      deprecated: false,
    },
    /**
     * @generated from enum value: PUBLISHED = 2;
     */
    PUBLISHED: {
      value: enumFromJson(PostStatusSchema, 'PUBLISHED'),
      description: undefined,
      deprecated: false,
    },
    /**
     * @generated from enum value: ARCHIVED = 3;
     */
    ARCHIVED: {
      value: enumFromJson(PostStatusSchema, 'ARCHIVED'),
      description: undefined,
      deprecated: false,
    },
  } as const,
});

/**
 * Nested enum for attachment type.
 *
 * @generated from enum board.v1.Post.Attachment.AttachmentType
 */
export const BoardV1PostAttachment_AttachmentTypeRef = builder.enumType(
  'BoardV1PostAttachment_AttachmentType',
  {
    description: 'Nested enum for attachment type.',
    values: {
      /**
       * @generated from enum value: IMAGE = 0;
       */
      IMAGE: {
        value: enumFromJson(Post_Attachment_AttachmentTypeSchema, 'IMAGE'),
        description: undefined,
        deprecated: false,
      },
      /**
       * @generated from enum value: VIDEO = 1;
       */
      VIDEO: {
        value: enumFromJson(Post_Attachment_AttachmentTypeSchema, 'VIDEO'),
        description: undefined,
        deprecated: false,
      },
      /**
       * @generated from enum value: DOCUMENT = 2;
       */
      DOCUMENT: {
        value: enumFromJson(Post_Attachment_AttachmentTypeSchema, 'DOCUMENT'),
        description: undefined,
        deprecated: false,
      },
    } as const,
  },
);

/**
 * Message representing a post on the board.
 *
 * @generated from message board.v1.Post
 */
export const BoardV1PostRef = builder.objectRef<Post>('BoardV1Post').implement({
  description: 'Message representing a post on the board.',
  deprecationReason: undefined,
  fields: (t) => ({
    _: t.boolean({
      resolve: () => false,
      description:
        'Fake field because GraphQL does not support empty objects. Do not query, use __typename instead.',
    }),
    /**
     * @generated from field: string id = 1;
     */
    id: t.field({
      type: 'ID',
      nullable: false,
      resolve: (parent) => encodeBase64(`BoardV1Post:${parent.id}`),
      description: undefined,
      deprecationReason: undefined,
    }),
    rawId: t.field({
      type: 'String',
      resolve: (parent) => String(parent.id),
    }),
    /**
     * @generated from field: string title = 2;
     */
    title: t.field({
      type: 'String',
      resolve: (parent) => parent.title,
      description: undefined,
      deprecationReason: undefined,
    }),
    /**
     * Author information imported from user.v1 package
     *
     * @generated from field: user.v1.User author = 3;
     */
    author: t.field({
      type: 'UserV1User',
      resolve: (parent) => parent.author,
      description: 'Author information imported from user.v1 package',
      deprecationReason: undefined,
    }),
    /**
     * @generated from field: string content = 4;
     */
    content: t.field({
      type: 'String',
      resolve: (parent) => parent.content,
      description: undefined,
      deprecationReason: undefined,
    }),
    /**
     * @generated from field: google.protobuf.Timestamp created_at = 5;
     */
    createdAt: t.field({
      type: 'GoogleProtobufTimestamp',
      resolve: (parent) => parent.createdAt,
      description: undefined,
      deprecationReason: undefined,
    }),
    /**
     * @generated from field: board.v1.PostStatus status = 6;
     */
    status: t.field({
      type: 'BoardV1PostStatus',
      resolve: (parent) => enumFromJson(PostStatusSchema, parent.status),
      description: undefined,
      deprecationReason: undefined,
    }),
    /**
     * Map field with scalar value type.
     * Maps tag names to view counts.
     *
     * @generated from field: map<string, int32> view_counts = 7;
     */
    viewCounts: t.field({
      type: ['IntMapEntry'],
      resolve: (parent) =>
        Object.entries(parent.viewCounts).map(([key, value]) => ({
          key: String(key),
          value: value,
        })),
      description:
        'Map field with scalar value type.\n Maps tag names to view counts.',
      deprecationReason: undefined,
    }),
    /**
     * Map field with enum value type.
     * Maps reaction types to post status (e.g., indicating mood or context).
     *
     * @generated from field: map<string, board.v1.PostStatus> reaction_statuses = 8;
     */
    reactionStatuses: t.field({
      type: ['String_BoardV1PostStatusMapEntry'],
      resolve: (parent) =>
        Object.entries(parent.reactionStatuses).map(([key, value]) => ({
          key: String(key),
          value: value,
        })),
      description:
        'Map field with enum value type.\n Maps reaction types to post status (e.g., indicating mood or context).',
      deprecationReason: undefined,
    }),
    /**
     * Address field with message value type.
     *
     * Deprecated field, should not be used in new code.
     *
     * @generated from field: board.v1.Post.Attachment attachment = 9 [deprecated = true];
     * @deprecated
     */
    attachment: t.field({
      type: 'BoardV1Post_Attachment',
      resolve: (parent) => parent.attachment,
      description:
        'Address field with message value type.\n\n\n Deprecated field, should not be used in new code.',
      deprecationReason: 'Deprecated. See the comments for more details.',
    }),
    /**
     * Map field with message value type.
     * Maps attachment IDs to attachment details.
     *
     * @generated from field: map<string, board.v1.Post.Attachment> attachments = 10;
     */
    attachments: t.field({
      type: ['String_BoardV1Post_AttachmentMapEntry'],
      resolve: (parent) =>
        Object.entries(parent.attachments).map(([key, value]) => ({
          key: String(key),
          value: value,
        })),
      description:
        'Map field with message value type.\n Maps attachment IDs to attachment details.',
      deprecationReason: undefined,
    }),
  }),
});

/**
 * Nested message representing an attachment to the post.
 *
 * @generated from message board.v1.Post.Attachment
 */
export const BoardV1Post_AttachmentRef = builder
  .objectRef<Post_Attachment>('BoardV1Post_Attachment')
  .implement({
    description: 'Nested message representing an attachment to the post.',
    deprecationReason: undefined,
    fields: (t) => ({
      _: t.boolean({
        resolve: () => false,
        description:
          'Fake field because GraphQL does not support empty objects. Do not query, use __typename instead.',
      }),
      /**
       * @generated from field: string url = 1;
       */
      url: t.field({
        type: 'String',
        resolve: (parent) => parent.url,
        description: undefined,
        deprecationReason: undefined,
      }),
      /**
       * @generated from field: string description = 2;
       */
      description: t.field({
        type: 'String',
        resolve: (parent) => parent.description,
        description: undefined,
        deprecationReason: undefined,
      }),
      /**
       * @generated from field: board.v1.Post.Attachment.AttachmentType type = 3;
       */
      type: t.field({
        type: 'BoardV1PostAttachment_AttachmentType',
        resolve: (parent) =>
          enumFromJson(Post_Attachment_AttachmentTypeSchema, parent.type),
        description: undefined,
        deprecationReason: undefined,
      }),
    }),
  });

/**
 * Message representing a list of posts.
 *
 * @generated from message board.v1.PostList
 */
export const BoardV1PostListRef = builder
  .objectRef<PostList>('BoardV1PostList')
  .implement({
    description: 'Message representing a list of posts.',
    deprecationReason: undefined,
    fields: (t) => ({
      _: t.boolean({
        resolve: () => false,
        description:
          'Fake field because GraphQL does not support empty objects. Do not query, use __typename instead.',
      }),
      /**
       * @generated from field: repeated board.v1.Post posts = 1;
       */
      posts: t.field({
        type: ['BoardV1Post'],
        resolve: (parent) => parent.posts,
        description: undefined,
        deprecationReason: undefined,
      }),
      /**
       * @generated from field: int32 total_posts = 2;
       */
      totalPosts: t.field({
        type: 'Int',
        resolve: (parent) => parent.totalPosts,
        description: undefined,
        deprecationReason: undefined,
      }),
    }),
  });

/**
 * Message representing a comment on a post.
 *
 * @generated from message board.v1.Comment
 */
export const BoardV1CommentRef = builder
  .objectRef<Comment>('BoardV1Comment')
  .implement({
    description: 'Message representing a comment on a post.',
    deprecationReason: undefined,
    fields: (t) => ({
      _: t.boolean({
        resolve: () => false,
        description:
          'Fake field because GraphQL does not support empty objects. Do not query, use __typename instead.',
      }),
      /**
       * @generated from field: string id = 1;
       */
      id: t.field({
        type: 'ID',
        nullable: false,
        resolve: (parent) => encodeBase64(`BoardV1Comment:${parent.id}`),
        description: undefined,
        deprecationReason: undefined,
      }),
      rawId: t.field({
        type: 'String',
        resolve: (parent) => String(parent.id),
      }),
      /**
       * Reference to the post this comment belongs to.
       *
       * @generated from field: string post_id = 2;
       */
      postId: t.field({
        type: 'String',
        resolve: (parent) => parent.postId,
        description: 'Reference to the post this comment belongs to.',
        deprecationReason: undefined,
      }),
      /**
       * Author information imported from user.v1 package
       *
       * @generated from field: user.v1.User author = 3;
       */
      author: t.field({
        type: 'UserV1User',
        resolve: (parent) => parent.author,
        description: 'Author information imported from user.v1 package',
        deprecationReason: undefined,
      }),
      /**
       * @generated from field: string content = 4;
       */
      content: t.field({
        type: 'String',
        resolve: (parent) => parent.content,
        description: undefined,
        deprecationReason: undefined,
      }),
      /**
       * @generated from field: google.protobuf.Timestamp created_at = 5;
       */
      createdAt: t.field({
        type: 'GoogleProtobufTimestamp',
        resolve: (parent) => parent.createdAt,
        description: undefined,
        deprecationReason: undefined,
      }),
    }),
  });

/**
 * Map field with enum value type.
 * Maps reaction types to post status (e.g., indicating mood or context).
 *
 * @generated from field: map<string, board.v1.PostStatus> reaction_statuses = 8;
 */
export const String_BoardV1PostStatusMapEntryRef = builder
  .objectRef<{ key: string; value: PostStatus }>(
    'String_BoardV1PostStatusMapEntry',
  )
  .implement({
    description:
      'Key-value pair for the map field reactionStatuses of board.v1.PostStatus.',
    fields: (t) => ({
      key: t.exposeString('key', { nullable: false }),
      value: t.expose('value', { type: 'BoardV1PostStatus', nullable: false }),
    }),
  });

/**
 * Map field with message value type.
 * Maps attachment IDs to attachment details.
 *
 * @generated from field: map<string, board.v1.Post.Attachment> attachments = 10;
 */
export const String_BoardV1Post_AttachmentMapEntryRef = builder
  .objectRef<{ key: string; value: Post_Attachment }>(
    'String_BoardV1Post_AttachmentMapEntry',
  )
  .implement({
    description:
      'Key-value pair for the map field attachments of board.v1.Post.Attachment.',
    fields: (t) => ({
      key: t.exposeString('key', { nullable: false }),
      value: t.expose('value', {
        type: 'BoardV1Post_Attachment',
        nullable: false,
      }),
    }),
  });

/**
 * Message for querying posts.
 *
 * @generated from message board.v1.PostQuery
 */
export const BoardV1PostQueryInputRef = builder
  .inputRef<PostQuery>('BoardV1PostQueryInput')
  .implement({
    description: 'Message for querying posts.',
    deprecationReason: undefined,
    fields: (t) => ({
      _: t.boolean({
        description:
          'Fake field because GraphQL does not support empty input. Do not use, It does nothing.',
      }),
      /**
       * @generated from field: string keyword = 1;
       */
      keyword: t.field({
        type: 'String',
        description: undefined,
        deprecationReason: undefined,
      }),
      /**
       * @generated from field: int32 page_number = 2;
       */
      pageNumber: t.field({
        type: 'Int',
        description: undefined,
        deprecationReason: undefined,
      }),
      /**
       * @generated from field: int32 results_per_page = 3;
       */
      resultsPerPage: t.field({
        type: 'Int',
        description: undefined,
        deprecationReason: undefined,
      }),
      /**
       * @generated from field: google.protobuf.Timestamp start_date = 4;
       */
      startDate: t.field({
        type: 'GoogleProtobufTimestampInput',
        description: undefined,
        deprecationReason: undefined,
      }),
      /**
       * @generated from field: google.protobuf.Timestamp end_date = 5;
       */
      endDate: t.field({
        type: 'GoogleProtobufTimestampInput',
        description: undefined,
        deprecationReason: undefined,
      }),
    }),
  });

/**
 * Message representing a post on the board.
 *
 * @generated from message board.v1.Post
 */
export const BoardV1PostInputRef = builder
  .inputRef<Post>('BoardV1PostInput')
  .implement({
    description: 'Message representing a post on the board.',
    deprecationReason: undefined,
    fields: (t) => ({
      _: t.boolean({
        description:
          'Fake field because GraphQL does not support empty input. Do not use, It does nothing.',
      }),
      /**
       * @generated from field: string id = 1;
       */
      id: t.field({
        type: 'String',
        description: undefined,
        deprecationReason: undefined,
      }),
      /**
       * @generated from field: string title = 2;
       */
      title: t.field({
        type: 'String',
        description: undefined,
        deprecationReason: undefined,
      }),
      /**
       * Author information imported from user.v1 package
       *
       * @generated from field: user.v1.User author = 3;
       */
      author: t.field({
        type: 'UserV1UserInput',
        description: 'Author information imported from user.v1 package',
        deprecationReason: undefined,
      }),
      /**
       * @generated from field: string content = 4;
       */
      content: t.field({
        type: 'String',
        description: undefined,
        deprecationReason: undefined,
      }),
      /**
       * @generated from field: google.protobuf.Timestamp created_at = 5;
       */
      createdAt: t.field({
        type: 'GoogleProtobufTimestampInput',
        description: undefined,
        deprecationReason: undefined,
      }),
      /**
       * @generated from field: board.v1.PostStatus status = 6;
       */
      status: t.field({
        type: 'BoardV1PostStatus',
        description: undefined,
        deprecationReason: undefined,
      }),
      /**
       * Map field with scalar value type.
       * Maps tag names to view counts.
       *
       * @generated from field: map<string, int32> view_counts = 7;
       */
      viewCounts: t.field({
        type: ['IntMapEntryInput'],
        description:
          'Map field with scalar value type.\n Maps tag names to view counts.',
        deprecationReason: undefined,
      }),
      /**
       * Map field with enum value type.
       * Maps reaction types to post status (e.g., indicating mood or context).
       *
       * @generated from field: map<string, board.v1.PostStatus> reaction_statuses = 8;
       */
      reactionStatuses: t.field({
        type: ['String_BoardV1PostStatusMapEntryInput'],
        description:
          'Map field with enum value type.\n Maps reaction types to post status (e.g., indicating mood or context).',
        deprecationReason: undefined,
      }),
      /**
       * Address field with message value type.
       *
       * Deprecated field, should not be used in new code.
       *
       * @generated from field: board.v1.Post.Attachment attachment = 9 [deprecated = true];
       * @deprecated
       */
      attachment: t.field({
        type: 'BoardV1Post_AttachmentInput',
        description:
          'Address field with message value type.\n\n\n Deprecated field, should not be used in new code.',
        deprecationReason: 'Deprecated. See the comments for more details.',
      }),
      /**
       * Map field with message value type.
       * Maps attachment IDs to attachment details.
       *
       * @generated from field: map<string, board.v1.Post.Attachment> attachments = 10;
       */
      attachments: t.field({
        type: ['String_BoardV1Post_AttachmentMapEntryInput'],
        description:
          'Map field with message value type.\n Maps attachment IDs to attachment details.',
        deprecationReason: undefined,
      }),
    }),
  });

/**
 * Nested message representing an attachment to the post.
 *
 * @generated from message board.v1.Post.Attachment
 */
export const BoardV1Post_AttachmentInputRef = builder
  .inputRef<Post_Attachment>('BoardV1Post_AttachmentInput')
  .implement({
    description: 'Nested message representing an attachment to the post.',
    deprecationReason: undefined,
    fields: (t) => ({
      _: t.boolean({
        description:
          'Fake field because GraphQL does not support empty input. Do not use, It does nothing.',
      }),
      /**
       * @generated from field: string url = 1;
       */
      url: t.field({
        type: 'String',
        description: undefined,
        deprecationReason: undefined,
      }),
      /**
       * @generated from field: string description = 2;
       */
      description: t.field({
        type: 'String',
        description: undefined,
        deprecationReason: undefined,
      }),
      /**
       * @generated from field: board.v1.Post.Attachment.AttachmentType type = 3;
       */
      type: t.field({
        type: 'BoardV1PostAttachment_AttachmentType',
        description: undefined,
        deprecationReason: undefined,
      }),
    }),
  });

/**
 * Message representing a comment on a post.
 *
 * @generated from message board.v1.Comment
 */
export const BoardV1CommentInputRef = builder
  .inputRef<Comment>('BoardV1CommentInput')
  .implement({
    description: 'Message representing a comment on a post.',
    deprecationReason: undefined,
    fields: (t) => ({
      _: t.boolean({
        description:
          'Fake field because GraphQL does not support empty input. Do not use, It does nothing.',
      }),
      /**
       * @generated from field: string id = 1;
       */
      id: t.field({
        type: 'String',
        description: undefined,
        deprecationReason: undefined,
      }),
      /**
       * Reference to the post this comment belongs to.
       *
       * @generated from field: string post_id = 2;
       */
      postId: t.field({
        type: 'String',
        description: 'Reference to the post this comment belongs to.',
        deprecationReason: undefined,
      }),
      /**
       * Author information imported from user.v1 package
       *
       * @generated from field: user.v1.User author = 3;
       */
      author: t.field({
        type: 'UserV1UserInput',
        description: 'Author information imported from user.v1 package',
        deprecationReason: undefined,
      }),
      /**
       * @generated from field: string content = 4;
       */
      content: t.field({
        type: 'String',
        description: undefined,
        deprecationReason: undefined,
      }),
      /**
       * @generated from field: google.protobuf.Timestamp created_at = 5;
       */
      createdAt: t.field({
        type: 'GoogleProtobufTimestampInput',
        description: undefined,
        deprecationReason: undefined,
      }),
    }),
  });

/**
 * Map field with enum value type.
 * Maps reaction types to post status (e.g., indicating mood or context).
 *
 * @generated from field: map<string, board.v1.PostStatus> reaction_statuses = 8;
 */
export const String_BoardV1PostStatusMapEntryInputRef = builder
  .inputRef<{ key: string; value: PostStatus }>(
    'String_BoardV1PostStatusMapEntryInput',
  )
  .implement({
    description:
      'Key-value pair for the map field reactionStatuses of board.v1.PostStatus.',
    fields: (t) => ({
      key: t.string({ required: true }),
      value: t.field({ type: 'BoardV1PostStatus', required: true }),
    }),
  });

/**
 * Map field with message value type.
 * Maps attachment IDs to attachment details.
 *
 * @generated from field: map<string, board.v1.Post.Attachment> attachments = 10;
 */
export const String_BoardV1Post_AttachmentMapEntryInputRef = builder
  .inputRef<{ key: string; value: Post_Attachment }>(
    'String_BoardV1Post_AttachmentMapEntryInput',
  )
  .implement({
    description:
      'Key-value pair for the map field attachments of board.v1.Post.Attachment.',
    fields: (t) => ({
      key: t.string({ required: true }),
      value: t.field({ type: 'BoardV1Post_AttachmentInput', required: true }),
    }),
  });

/**
 * A function to make a board.v1.PostQuery input
 */
export function makeBoardV1PostQueryInput(input: any): PostQuery {
  return create(PostQuerySchema, {
    /**
     * @generated from field: string keyword = 1;
     */
    keyword: input?.keyword,
    /**
     * @generated from field: int32 page_number = 2;
     */
    pageNumber: input?.pageNumber,
    /**
     * @generated from field: int32 results_per_page = 3;
     */
    resultsPerPage: input?.resultsPerPage,
    /**
     * @generated from field: google.protobuf.Timestamp start_date = 4;
     */
    startDate: input?.startDate
      ? makeGoogleProtobufTimestampInput(input.startDate)
      : null,
    /**
     * @generated from field: google.protobuf.Timestamp end_date = 5;
     */
    endDate: input?.endDate
      ? makeGoogleProtobufTimestampInput(input.endDate)
      : null,
  });
}

/**
 * A function to make a board.v1.Post input
 */
export function makeBoardV1PostInput(input: any): Post {
  return create(PostSchema, {
    /**
     * @generated from field: string id = 1;
     */
    id: input?.id,
    /**
     * @generated from field: string title = 2;
     */
    title: input?.title,
    /**
     * Author information imported from user.v1 package
     *
     * @generated from field: user.v1.User author = 3;
     */
    author: input?.author ? makeUserV1UserInput(input.author) : null,
    /**
     * @generated from field: string content = 4;
     */
    content: input?.content,
    /**
     * @generated from field: google.protobuf.Timestamp created_at = 5;
     */
    createdAt: input?.createdAt
      ? makeGoogleProtobufTimestampInput(input.createdAt)
      : null,
    /**
     * @generated from field: board.v1.PostStatus status = 6;
     */
    status: input?.status,
    /**
     * Map field with scalar value type.
     * Maps tag names to view counts.
     *
     * @generated from field: map<string, int32> view_counts = 7;
     */
    viewCounts: input?.viewCounts
      ? Object.fromEntries(
          input?.viewCounts?.map(({ key, value }) => [key, value]),
        )
      : null,
    /**
     * Map field with enum value type.
     * Maps reaction types to post status (e.g., indicating mood or context).
     *
     * @generated from field: map<string, board.v1.PostStatus> reaction_statuses = 8;
     */
    reactionStatuses: input?.reactionStatuses
      ? Object.fromEntries(
          input?.reactionStatuses?.map(({ key, value }) => [key, value]),
        )
      : null,
    /**
     * Address field with message value type.
     *
     * Deprecated field, should not be used in new code.
     *
     * @generated from field: board.v1.Post.Attachment attachment = 9 [deprecated = true];
     * @deprecated
     */
    attachment: input?.attachment
      ? makeBoardV1Post_AttachmentInput(input.attachment)
      : null,
    /**
     * Map field with message value type.
     * Maps attachment IDs to attachment details.
     *
     * @generated from field: map<string, board.v1.Post.Attachment> attachments = 10;
     */
    attachments: input?.attachments
      ? Object.fromEntries(
          input?.attachments?.map(({ key, value }) => [
            key,
            makeBoardV1Post_AttachmentInput(value),
          ]),
        )
      : null,
  });
}

/**
 * A function to make a board.v1.Post.Attachment input
 */
export function makeBoardV1Post_AttachmentInput(input: any): Post_Attachment {
  return create(Post_AttachmentSchema, {
    /**
     * @generated from field: string url = 1;
     */
    url: input?.url,
    /**
     * @generated from field: string description = 2;
     */
    description: input?.description,
    /**
     * @generated from field: board.v1.Post.Attachment.AttachmentType type = 3;
     */
    type: input?.type,
  });
}

/**
 * A function to make a board.v1.Comment input
 */
export function makeBoardV1CommentInput(input: any): Comment {
  return create(CommentSchema, {
    /**
     * @generated from field: string id = 1;
     */
    id: input?.id,
    /**
     * Reference to the post this comment belongs to.
     *
     * @generated from field: string post_id = 2;
     */
    postId: input?.postId,
    /**
     * Author information imported from user.v1 package
     *
     * @generated from field: user.v1.User author = 3;
     */
    author: input?.author ? makeUserV1UserInput(input.author) : null,
    /**
     * @generated from field: string content = 4;
     */
    content: input?.content,
    /**
     * @generated from field: google.protobuf.Timestamp created_at = 5;
     */
    createdAt: input?.createdAt
      ? makeGoogleProtobufTimestampInput(input.createdAt)
      : null,
  });
}

/**
 * Retrieves a single post.
 *
 * @generated from rpc board.v1.BoardService.GetPost
 */
builder.queryField('boardV1BoardServiceGetPost', (t) =>
  t.field({
    /**
     * Message representing a post on the board.
     *
     * @generated from message board.v1.Post
     */
    type: 'BoardV1Post',
    description: 'Retrieves a single post.',
    deprecationReason: undefined,
    args: {
      /**
       * A generic empty message that you can re-use to avoid defining duplicated
       * empty messages in your APIs. A typical example is to use it as the request
       * or the response type of an API method. For instance:
       *
       *     service Foo {
       *       rpc Bar(google.protobuf.Empty) returns (google.protobuf.Empty);
       *     }
       *
       *
       * @generated from message google.protobuf.Empty
       */
      input: t.arg({
        type: 'GoogleProtobufEmptyInput',
        required: true,
        description:
          'A generic empty message that you can re-use to avoid defining duplicated\n empty messages in your APIs. A typical example is to use it as the request\n or the response type of an API method. For instance:\n\n     service Foo {\n       rpc Bar(google.protobuf.Empty) returns (google.protobuf.Empty);\n     }',
      }),
    },
    resolve: (_root, { input }, context) => {
      if (!context.boardV1BoardService)
        throw new Error('boardV1BoardService is not provided.');
      return context.boardV1BoardService.getPost(
        makeGoogleProtobufEmptyInput(input),
        { headers: context.boardV1BoardServiceRequestHeaders },
      );
    },
  }),
);

/**
 * Retrieves a list of posts based on query parameters.
 *
 * @generated from rpc board.v1.BoardService.ListPosts
 */
builder.queryField('boardV1BoardServiceListPosts', (t) =>
  t.field({
    /**
     * Message representing a list of posts.
     *
     * @generated from message board.v1.PostList
     */
    type: 'BoardV1PostList',
    description: 'Retrieves a list of posts based on query parameters.',
    deprecationReason: undefined,
    args: {
      /**
       * Message for querying posts.
       *
       * @generated from message board.v1.PostQuery
       */
      input: t.arg({
        type: 'BoardV1PostQueryInput',
        required: true,
        description: 'Message for querying posts.',
      }),
    },
    resolve: (_root, { input }, context) => {
      if (!context.boardV1BoardService)
        throw new Error('boardV1BoardService is not provided.');
      return context.boardV1BoardService.listPosts(
        makeBoardV1PostQueryInput(input),
        { headers: context.boardV1BoardServiceRequestHeaders },
      );
    },
  }),
);

/**
 * Creates a new post.
 *
 * @generated from rpc board.v1.BoardService.CreatePost
 */
builder.mutationField('boardV1BoardServiceCreatePost', (t) =>
  t.field({
    /**
     * Message representing a post on the board.
     *
     * @generated from message board.v1.Post
     */
    type: 'BoardV1Post',
    description: 'Creates a new post.',
    deprecationReason: undefined,
    args: {
      /**
       * Message representing a post on the board.
       *
       * @generated from message board.v1.Post
       */
      input: t.arg({
        type: 'BoardV1PostInput',
        required: true,
        description: 'Message representing a post on the board.',
      }),
    },
    resolve: (_root, { input }, context) => {
      if (!context.boardV1BoardService)
        throw new Error('boardV1BoardService is not provided.');
      return context.boardV1BoardService.createPost(
        makeBoardV1PostInput(input),
        { headers: context.boardV1BoardServiceRequestHeaders },
      );
    },
  }),
);

/**
 * Deletes a post.
 *
 * @generated from rpc board.v1.BoardService.DeletePost
 */
builder.mutationField('boardV1BoardServiceDeletePost', (t) =>
  t.field({
    /**
     * A generic empty message that you can re-use to avoid defining duplicated
     * empty messages in your APIs. A typical example is to use it as the request
     * or the response type of an API method. For instance:
     *
     *     service Foo {
     *       rpc Bar(google.protobuf.Empty) returns (google.protobuf.Empty);
     *     }
     *
     *
     * @generated from message google.protobuf.Empty
     */
    type: 'GoogleProtobufEmpty',
    description: 'Deletes a post.',
    deprecationReason: undefined,
    args: {
      /**
       * Message representing a post on the board.
       *
       * @generated from message board.v1.Post
       */
      input: t.arg({
        type: 'BoardV1PostInput',
        required: true,
        description: 'Message representing a post on the board.',
      }),
    },
    resolve: (_root, { input }, context) => {
      if (!context.boardV1BoardService)
        throw new Error('boardV1BoardService is not provided.');
      return context.boardV1BoardService.deletePost(
        makeBoardV1PostInput(input),
        { headers: context.boardV1BoardServiceRequestHeaders },
      );
    },
  }),
);

/**
 * Adds a comment to a post.
 *
 * @generated from rpc board.v1.BoardService.AddComment
 */
builder.mutationField('boardV1BoardServiceAddComment', (t) =>
  t.field({
    /**
     * Message representing a comment on a post.
     *
     * @generated from message board.v1.Comment
     */
    type: 'BoardV1Comment',
    description: 'Adds a comment to a post.',
    deprecationReason: undefined,
    args: {
      /**
       * Message representing a comment on a post.
       *
       * @generated from message board.v1.Comment
       */
      input: t.arg({
        type: 'BoardV1CommentInput',
        required: true,
        description: 'Message representing a comment on a post.',
      }),
    },
    resolve: (_root, { input }, context) => {
      if (!context.boardV1BoardService)
        throw new Error('boardV1BoardService is not provided.');
      return context.boardV1BoardService.addComment(
        makeBoardV1CommentInput(input),
        { headers: context.boardV1BoardServiceRequestHeaders },
      );
    },
  }),
);
