// @generated by pothos-protoc-gen v0.0.0-experimental.202503309 with parameter "import_extension=js,ts_nocheck=true,builder_path=../builder.js"
// @generated from file post/post.proto (package post.v1, syntax proto3)
/* eslint-disable */
// @ts-nocheck

import { create, enumFromJson } from '@bufbuild/protobuf';
import { encodeBase64 } from '@pothos/core';
import { builder } from '../../builder.js';
import { makeUserV1UserInput } from '../user_pothos.js';
import type {
  CreatePostRequest,
  DeletePostRequest,
  GetPostRequest,
  GetPostWithAuthorRequest,
  ListPostsRequest,
  ListPostsResponse,
  Post,
  PostWithAuthor,
  UpdatePostRequest,
} from './post_pb.js';
import {
  CreatePostRequestSchema,
  DeletePostRequestSchema,
  GetPostRequestSchema,
  GetPostWithAuthorRequestSchema,
  ListPostsRequestSchema,
  PostCategorySchema,
  PostListFilterSchema,
  PostStatusSchema,
  UpdatePostRequestSchema,
} from './post_pb.js';

/**
 * Post status enum
 *
 * @generated from enum post.v1.PostStatus
 */
export const PostV1PostStatusRef = builder.enumType('PostV1PostStatus', {
  description: 'Post status enum',
  values: {
    /**
     * @generated from enum value: POST_STATUS_UNSPECIFIED = 0;
     */
    UNSPECIFIED: {
      value: enumFromJson(PostStatusSchema, 'POST_STATUS_UNSPECIFIED'),
      description: undefined,
      deprecated: false,
    },
    /**
     * @generated from enum value: POST_STATUS_DRAFT = 1;
     */
    DRAFT: {
      value: enumFromJson(PostStatusSchema, 'POST_STATUS_DRAFT'),
      description: undefined,
      deprecated: false,
    },
    /**
     * @generated from enum value: POST_STATUS_PUBLISHED = 2;
     */
    PUBLISHED: {
      value: enumFromJson(PostStatusSchema, 'POST_STATUS_PUBLISHED'),
      description: undefined,
      deprecated: false,
    },
    /**
     * @generated from enum value: POST_STATUS_ARCHIVED = 3;
     */
    ARCHIVED: {
      value: enumFromJson(PostStatusSchema, 'POST_STATUS_ARCHIVED'),
      description: undefined,
      deprecated: false,
    },
  } as const,
});

/**
 * Category enum for posts
 *
 * @generated from enum post.v1.PostCategory
 */
export const PostV1PostCategoryRef = builder.enumType('PostV1PostCategory', {
  description: 'Category enum for posts',
  values: {
    /**
     * @generated from enum value: POST_CATEGORY_UNSPECIFIED = 0;
     */
    UNSPECIFIED: {
      value: enumFromJson(PostCategorySchema, 'POST_CATEGORY_UNSPECIFIED'),
      description: undefined,
      deprecated: false,
    },
    /**
     * @generated from enum value: POST_CATEGORY_TECHNOLOGY = 1;
     */
    TECHNOLOGY: {
      value: enumFromJson(PostCategorySchema, 'POST_CATEGORY_TECHNOLOGY'),
      description: undefined,
      deprecated: false,
    },
    /**
     * @generated from enum value: POST_CATEGORY_HEALTH = 2;
     */
    HEALTH: {
      value: enumFromJson(PostCategorySchema, 'POST_CATEGORY_HEALTH'),
      description: undefined,
      deprecated: false,
    },
    /**
     * @generated from enum value: POST_CATEGORY_TRAVEL = 3;
     */
    TRAVEL: {
      value: enumFromJson(PostCategorySchema, 'POST_CATEGORY_TRAVEL'),
      description: undefined,
      deprecated: false,
    },
    /**
     * @generated from enum value: POST_CATEGORY_FOOD = 4;
     */
    FOOD: {
      value: enumFromJson(PostCategorySchema, 'POST_CATEGORY_FOOD'),
      description: undefined,
      deprecated: false,
    },
    /**
     * @generated from enum value: POST_CATEGORY_LIFESTYLE = 5;
     */
    LIFESTYLE: {
      value: enumFromJson(PostCategorySchema, 'POST_CATEGORY_LIFESTYLE'),
      description: undefined,
      deprecated: false,
    },
  } as const,
});

/**
 * Filter type for listing posts
 *
 * @generated from enum post.v1.PostListFilter
 */
export const PostV1PostListFilterRef = builder.enumType(
  'PostV1PostListFilter',
  {
    description: 'Filter type for listing posts',
    values: {
      /**
       * @generated from enum value: POST_LIST_FILTER_ALL = 0;
       */
      ALL: {
        value: enumFromJson(PostListFilterSchema, 'POST_LIST_FILTER_ALL'),
        description: undefined,
        deprecated: false,
      },
      /**
       * @generated from enum value: POST_LIST_FILTER_PUBLISHED = 1;
       */
      PUBLISHED: {
        value: enumFromJson(PostListFilterSchema, 'POST_LIST_FILTER_PUBLISHED'),
        description: undefined,
        deprecated: false,
      },
      /**
       * @generated from enum value: POST_LIST_FILTER_DRAFTS = 2;
       */
      DRAFTS: {
        value: enumFromJson(PostListFilterSchema, 'POST_LIST_FILTER_DRAFTS'),
        description: undefined,
        deprecated: false,
      },
      /**
       * @generated from enum value: POST_LIST_FILTER_ARCHIVED = 3;
       */
      ARCHIVED: {
        value: enumFromJson(PostListFilterSchema, 'POST_LIST_FILTER_ARCHIVED'),
        description: undefined,
        deprecated: false,
      },
    } as const,
  },
);

/**
 * Post message
 *
 * @generated from message post.v1.Post
 */
export const PostV1PostRef = builder.objectRef<Post>('PostV1Post').implement({
  description: 'Post message',
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
      resolve: (parent) => encodeBase64(`PostV1Post:${parent.id}`),
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
     * @generated from field: string content = 3;
     */
    content: t.field({
      type: 'String',
      resolve: (parent) => parent.content,
      description: undefined,
      deprecationReason: undefined,
    }),
    /**
     * @generated from field: post.v1.PostStatus status = 4;
     */
    status: t.field({
      type: 'PostV1PostStatus',
      resolve: (parent) => enumFromJson(PostStatusSchema, parent.status),
      description: undefined,
      deprecationReason: undefined,
    }),
    /**
     * @generated from field: post.v1.PostCategory category = 5;
     */
    category: t.field({
      type: 'PostV1PostCategory',
      resolve: (parent) => enumFromJson(PostCategorySchema, parent.category),
      description: undefined,
      deprecationReason: undefined,
    }),
    /**
     * Reference to User
     *
     * @generated from field: string author_id = 6;
     */
    authorId: t.field({
      type: 'String',
      resolve: (parent) => parent.authorId,
      description: 'Reference to User',
      deprecationReason: undefined,
    }),
    /**
     * @generated from field: google.protobuf.Timestamp created_at = 7;
     */
    createdAt: t.field({
      type: 'GoogleProtobufTimestamp',
      resolve: (parent) => parent.createdAt,
      description: undefined,
      deprecationReason: undefined,
    }),
    /**
     * @generated from field: google.protobuf.Timestamp updated_at = 8;
     */
    updatedAt: t.field({
      type: 'GoogleProtobufTimestamp',
      resolve: (parent) => parent.updatedAt,
      description: undefined,
      deprecationReason: undefined,
    }),
    /**
     * Metadata as key-value pairs
     *
     * @generated from field: map<string, string> metadata = 9 [deprecated = true];
     * @deprecated
     */
    metadata: t.field({
      type: ['StringMapEntry'],
      resolve: (parent) =>
        Object.entries(parent.metadata).map(([key, value]) => ({
          key: String(key),
          value: value,
        })),
      description: 'Metadata as key-value pairs',
      deprecationReason: 'Deprecated. See the comments for more details.',
    }),
    /**
     * @generated from field: repeated string tags = 10;
     */
    tags: t.field({
      type: ['String'],
      resolve: (parent) => parent.tags,
      description: undefined,
      deprecationReason: undefined,
    }),
  }),
});

/**
 * List Posts Response
 *
 * @generated from message post.v1.ListPostsResponse
 */
export const PostV1ListPostsResponseRef = builder
  .objectRef<ListPostsResponse>('PostV1ListPostsResponse')
  .implement({
    description: 'List Posts Response',
    deprecationReason: undefined,
    fields: (t) => ({
      _: t.boolean({
        resolve: () => false,
        description:
          'Fake field because GraphQL does not support empty objects. Do not query, use __typename instead.',
      }),
      /**
       * @generated from field: repeated post.v1.Post posts = 1;
       */
      posts: t.field({
        type: ['PostV1Post'],
        resolve: (parent) => parent.posts,
        description: undefined,
        deprecationReason: undefined,
      }),
      /**
       * @generated from field: string next_page_token = 2;
       */
      nextPageToken: t.field({
        type: 'String',
        resolve: (parent) => parent.nextPageToken,
        description: undefined,
        deprecationReason: undefined,
      }),
      /**
       * @generated from field: int32 total_count = 3;
       */
      totalCount: t.field({
        type: 'Int',
        resolve: (parent) => parent.totalCount,
        description: undefined,
        deprecationReason: undefined,
      }),
    }),
  });

/**
 * @generated from message post.v1.PostWithAuthor
 */
export const PostV1PostWithAuthorRef = builder
  .objectRef<PostWithAuthor>('PostV1PostWithAuthor')
  .implement({
    description: undefined,
    deprecationReason: undefined,
    fields: (t) => ({
      _: t.boolean({
        resolve: () => false,
        description:
          'Fake field because GraphQL does not support empty objects. Do not query, use __typename instead.',
      }),
      /**
       * @generated from field: post.v1.Post post = 1;
       */
      post: t.field({
        type: 'PostV1Post',
        resolve: (parent) => parent.post,
        description: undefined,
        deprecationReason: undefined,
      }),
      /**
       * @generated from field: user.v1.User author = 2;
       */
      author: t.field({
        type: 'UserV1User',
        resolve: (parent) => parent.author,
        description: undefined,
        deprecationReason: undefined,
      }),
    }),
  });

/**
 * Create Post Request
 *
 * @generated from message post.v1.CreatePostRequest
 */
export const PostV1CreatePostRequestInputRef = builder
  .inputRef<CreatePostRequest>('PostV1CreatePostRequestInput')
  .implement({
    description: 'Create Post Request',
    deprecationReason: undefined,
    fields: (t) => ({
      _: t.boolean({
        description:
          'Fake field because GraphQL does not support empty input. Do not use, It does nothing.',
      }),
      /**
       * @generated from field: string title = 1;
       */
      title: t.field({
        type: 'String',
        description: undefined,
        deprecationReason: undefined,
      }),
      /**
       * @generated from field: string content = 2;
       */
      content: t.field({
        type: 'String',
        description: undefined,
        deprecationReason: undefined,
      }),
      /**
       * @generated from field: post.v1.PostStatus status = 3;
       */
      status: t.field({
        type: 'PostV1PostStatus',
        description: undefined,
        deprecationReason: undefined,
      }),
      /**
       * @generated from field: post.v1.PostCategory category = 4;
       */
      category: t.field({
        type: 'PostV1PostCategory',
        description: undefined,
        deprecationReason: undefined,
      }),
      /**
       * @generated from field: string author_id = 5;
       */
      authorId: t.field({
        type: 'String',
        description: undefined,
        deprecationReason: undefined,
      }),
      /**
       * @generated from field: map<string, string> metadata = 6;
       */
      metadata: t.field({
        type: ['StringMapEntryInput'],
        description: undefined,
        deprecationReason: undefined,
      }),
      /**
       * @generated from field: repeated string tags = 7;
       */
      tags: t.field({
        type: ['String'],
        description: undefined,
        deprecationReason: undefined,
      }),
    }),
  });

/**
 * Get Post Request
 *
 * @generated from message post.v1.GetPostRequest
 */
export const PostV1GetPostRequestInputRef = builder
  .inputRef<GetPostRequest>('PostV1GetPostRequestInput')
  .implement({
    description: 'Get Post Request',
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
    }),
  });

/**
 * Update Post Request
 *
 * @generated from message post.v1.UpdatePostRequest
 */
export const PostV1UpdatePostRequestInputRef = builder
  .inputRef<UpdatePostRequest>('PostV1UpdatePostRequestInput')
  .implement({
    description: 'Update Post Request',
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
       * @generated from field: string content = 3;
       */
      content: t.field({
        type: 'String',
        description: undefined,
        deprecationReason: undefined,
      }),
      /**
       * @generated from field: post.v1.PostStatus status = 4;
       */
      status: t.field({
        type: 'PostV1PostStatus',
        description: undefined,
        deprecationReason: undefined,
      }),
      /**
       * @generated from field: post.v1.PostCategory category = 5;
       */
      category: t.field({
        type: 'PostV1PostCategory',
        description: undefined,
        deprecationReason: undefined,
      }),
      /**
       * @generated from field: map<string, string> metadata = 6;
       */
      metadata: t.field({
        type: ['StringMapEntryInput'],
        description: undefined,
        deprecationReason: undefined,
      }),
      /**
       * @generated from field: repeated string tags = 7;
       */
      tags: t.field({
        type: ['String'],
        description: undefined,
        deprecationReason: undefined,
      }),
    }),
  });

/**
 * Delete Post Request
 *
 * @generated from message post.v1.DeletePostRequest
 */
export const PostV1DeletePostRequestInputRef = builder
  .inputRef<DeletePostRequest>('PostV1DeletePostRequestInput')
  .implement({
    description: 'Delete Post Request',
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
    }),
  });

/**
 * List Posts Request
 *
 * @generated from message post.v1.ListPostsRequest
 */
export const PostV1ListPostsRequestInputRef = builder
  .inputRef<ListPostsRequest>('PostV1ListPostsRequestInput')
  .implement({
    description: 'List Posts Request',
    deprecationReason: undefined,
    fields: (t) => ({
      _: t.boolean({
        description:
          'Fake field because GraphQL does not support empty input. Do not use, It does nothing.',
      }),
      /**
       * @generated from field: int32 page_size = 1;
       */
      pageSize: t.field({
        type: 'Int',
        description: undefined,
        deprecationReason: undefined,
      }),
      /**
       * @generated from field: string page_token = 2;
       */
      pageToken: t.field({
        type: 'String',
        description: undefined,
        deprecationReason: undefined,
      }),
      /**
       * @generated from field: post.v1.PostListFilter filter = 3;
       */
      filter: t.field({
        type: 'PostV1PostListFilter',
        description: undefined,
        deprecationReason: undefined,
      }),
      /**
       * @generated from field: post.v1.PostCategory category = 4;
       */
      category: t.field({
        type: 'PostV1PostCategory',
        description: undefined,
        deprecationReason: undefined,
      }),
    }),
  });

/**
 * Get Post with Author
 *
 * @generated from message post.v1.GetPostWithAuthorRequest
 */
export const PostV1GetPostWithAuthorRequestInputRef = builder
  .inputRef<GetPostWithAuthorRequest>('PostV1GetPostWithAuthorRequestInput')
  .implement({
    description: 'Get Post with Author',
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
       * @generated from field: user.v1.User author = 2;
       */
      author: t.field({
        type: 'UserV1UserInput',
        description: undefined,
        deprecationReason: undefined,
      }),
    }),
  });

/**
 * A function to make a post.v1.CreatePostRequest input
 */
export function makePostV1CreatePostRequestInput(
  input: any,
): CreatePostRequest {
  return create(CreatePostRequestSchema, {
    /**
     * @generated from field: string title = 1;
     */
    title: input?.title,
    /**
     * @generated from field: string content = 2;
     */
    content: input?.content,
    /**
     * @generated from field: post.v1.PostStatus status = 3;
     */
    status: input?.status,
    /**
     * @generated from field: post.v1.PostCategory category = 4;
     */
    category: input?.category,
    /**
     * @generated from field: string author_id = 5;
     */
    authorId: input?.authorId,
    /**
     * @generated from field: map<string, string> metadata = 6;
     */
    metadata: input?.metadata
      ? Object.fromEntries(
          input?.metadata?.map(({ key, value }) => [key, value]),
        )
      : null,
    /**
     * @generated from field: repeated string tags = 7;
     */
    tags: input?.tags,
  });
}

/**
 * A function to make a post.v1.GetPostRequest input
 */
export function makePostV1GetPostRequestInput(input: any): GetPostRequest {
  return create(GetPostRequestSchema, {
    /**
     * @generated from field: string id = 1;
     */
    id: input?.id,
  });
}

/**
 * A function to make a post.v1.UpdatePostRequest input
 */
export function makePostV1UpdatePostRequestInput(
  input: any,
): UpdatePostRequest {
  return create(UpdatePostRequestSchema, {
    /**
     * @generated from field: string id = 1;
     */
    id: input?.id,
    /**
     * @generated from field: string title = 2;
     */
    title: input?.title,
    /**
     * @generated from field: string content = 3;
     */
    content: input?.content,
    /**
     * @generated from field: post.v1.PostStatus status = 4;
     */
    status: input?.status,
    /**
     * @generated from field: post.v1.PostCategory category = 5;
     */
    category: input?.category,
    /**
     * @generated from field: map<string, string> metadata = 6;
     */
    metadata: input?.metadata
      ? Object.fromEntries(
          input?.metadata?.map(({ key, value }) => [key, value]),
        )
      : null,
    /**
     * @generated from field: repeated string tags = 7;
     */
    tags: input?.tags,
  });
}

/**
 * A function to make a post.v1.DeletePostRequest input
 */
export function makePostV1DeletePostRequestInput(
  input: any,
): DeletePostRequest {
  return create(DeletePostRequestSchema, {
    /**
     * @generated from field: string id = 1;
     */
    id: input?.id,
  });
}

/**
 * A function to make a post.v1.ListPostsRequest input
 */
export function makePostV1ListPostsRequestInput(input: any): ListPostsRequest {
  return create(ListPostsRequestSchema, {
    /**
     * @generated from field: int32 page_size = 1;
     */
    pageSize: input?.pageSize,
    /**
     * @generated from field: string page_token = 2;
     */
    pageToken: input?.pageToken,
    /**
     * @generated from field: post.v1.PostListFilter filter = 3;
     */
    filter: input?.filter,
    /**
     * @generated from field: post.v1.PostCategory category = 4;
     */
    category: input?.category,
  });
}

/**
 * A function to make a post.v1.GetPostWithAuthorRequest input
 */
export function makePostV1GetPostWithAuthorRequestInput(
  input: any,
): GetPostWithAuthorRequest {
  return create(GetPostWithAuthorRequestSchema, {
    /**
     * @generated from field: string id = 1;
     */
    id: input?.id,
    /**
     * @generated from field: user.v1.User author = 2;
     */
    author: input?.author ? makeUserV1UserInput(input.author) : null,
  });
}

/**
 * Create a new post
 *
 * @generated from rpc post.v1.PostService.CreatePost
 */
builder.mutationField('postV1PostServiceCreatePost', (t) =>
  t.field({
    /**
     * Post message
     *
     * @generated from message post.v1.Post
     */
    type: 'PostV1Post',
    description: 'Create a new post',
    deprecationReason: undefined,
    args: {
      /**
       * Create Post Request
       *
       * @generated from message post.v1.CreatePostRequest
       */
      input: t.arg({
        type: 'PostV1CreatePostRequestInput',
        required: true,
        description: 'Create Post Request',
      }),
    },
    resolve: (_root, { input }, context) => {
      if (!context.postV1PostService)
        throw new Error('postV1PostService is not provided.');
      return context.postV1PostService.createPost(
        makePostV1CreatePostRequestInput(input),
        { headers: context.postV1PostServiceRequestHeaders },
      );
    },
  }),
);

/**
 * Get a post by ID
 *
 * @generated from rpc post.v1.PostService.GetPost
 */
builder.queryField('postV1PostServiceGetPost', (t) =>
  t.field({
    /**
     * Post message
     *
     * @generated from message post.v1.Post
     */
    type: 'PostV1Post',
    description: 'Get a post by ID',
    deprecationReason: undefined,
    args: {
      /**
       * Get Post Request
       *
       * @generated from message post.v1.GetPostRequest
       */
      input: t.arg({
        type: 'PostV1GetPostRequestInput',
        required: true,
        description: 'Get Post Request',
      }),
    },
    resolve: (_root, { input }, context) => {
      if (!context.postV1PostService)
        throw new Error('postV1PostService is not provided.');
      return context.postV1PostService.getPost(
        makePostV1GetPostRequestInput(input),
        { headers: context.postV1PostServiceRequestHeaders },
      );
    },
  }),
);

/**
 * Update an existing post
 *
 * @generated from rpc post.v1.PostService.UpdatePost
 */
builder.mutationField('postV1PostServiceUpdatePost', (t) =>
  t.field({
    /**
     * Post message
     *
     * @generated from message post.v1.Post
     */
    type: 'PostV1Post',
    description: 'Update an existing post',
    deprecationReason: undefined,
    args: {
      /**
       * Update Post Request
       *
       * @generated from message post.v1.UpdatePostRequest
       */
      input: t.arg({
        type: 'PostV1UpdatePostRequestInput',
        required: true,
        description: 'Update Post Request',
      }),
    },
    resolve: (_root, { input }, context) => {
      if (!context.postV1PostService)
        throw new Error('postV1PostService is not provided.');
      return context.postV1PostService.updatePost(
        makePostV1UpdatePostRequestInput(input),
        { headers: context.postV1PostServiceRequestHeaders },
      );
    },
  }),
);

/**
 * Delete a post
 *
 * @generated from rpc post.v1.PostService.DeletePost
 */
builder.mutationField('postV1PostServiceDeletePost', (t) =>
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
    description: 'Delete a post',
    deprecationReason: undefined,
    args: {
      /**
       * Delete Post Request
       *
       * @generated from message post.v1.DeletePostRequest
       */
      input: t.arg({
        type: 'PostV1DeletePostRequestInput',
        required: true,
        description: 'Delete Post Request',
      }),
    },
    resolve: (_root, { input }, context) => {
      if (!context.postV1PostService)
        throw new Error('postV1PostService is not provided.');
      return context.postV1PostService.deletePost(
        makePostV1DeletePostRequestInput(input),
        { headers: context.postV1PostServiceRequestHeaders },
      );
    },
  }),
);

/**
 * List posts with filtering
 *
 * @generated from rpc post.v1.PostService.ListPosts
 */
builder.queryField('postV1PostServiceListPosts', (t) =>
  t.field({
    /**
     * List Posts Response
     *
     * @generated from message post.v1.ListPostsResponse
     */
    type: 'PostV1ListPostsResponse',
    description: 'List posts with filtering',
    deprecationReason: undefined,
    args: {
      /**
       * List Posts Request
       *
       * @generated from message post.v1.ListPostsRequest
       */
      input: t.arg({
        type: 'PostV1ListPostsRequestInput',
        required: true,
        description: 'List Posts Request',
      }),
    },
    resolve: (_root, { input }, context) => {
      if (!context.postV1PostService)
        throw new Error('postV1PostService is not provided.');
      return context.postV1PostService.listPosts(
        makePostV1ListPostsRequestInput(input),
        { headers: context.postV1PostServiceRequestHeaders },
      );
    },
  }),
);

/**
 * Get post with author information
 *
 * @generated from rpc post.v1.PostService.GetPostWithAuthor
 */
builder.queryField('postV1PostServiceGetPostWithAuthor', (t) =>
  t.field({
    /**
     * @generated from message post.v1.PostWithAuthor
     */
    type: 'PostV1PostWithAuthor',
    description: 'Get post with author information',
    deprecationReason: undefined,
    args: {
      /**
       * Get Post with Author
       *
       * @generated from message post.v1.GetPostWithAuthorRequest
       */
      input: t.arg({
        type: 'PostV1GetPostWithAuthorRequestInput',
        required: true,
        description: 'Get Post with Author',
      }),
    },
    resolve: (_root, { input }, context) => {
      if (!context.postV1PostService)
        throw new Error('postV1PostService is not provided.');
      return context.postV1PostService.getPostWithAuthor(
        makePostV1GetPostWithAuthorRequestInput(input),
        { headers: context.postV1PostServiceRequestHeaders },
      );
    },
  }),
);
