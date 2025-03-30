import { printSchema } from 'graphql';
import { expect, test } from 'vitest';
import { schema } from './schema.ts';

test('Print schema', () => {
  expect(printSchema(schema)).toMatchInlineSnapshot(/* GraphQL */ `
    """"
    A generic empty message that you can re-use to avoid defining duplicated
     empty messages in your APIs. A typical example is to use it as the request
     or the response type of an API method. For instance:

         service Foo {
           rpc Bar(google.protobuf.Empty) returns (google.protobuf.Empty);
         }
    """
    type GoogleProtobufEmpty {
      """
      Fake field because GraphQL does not support empty objects. Do not query, use __typename instead.
      """
      _: Boolean
    }

    """
    Wrapper message for \`string\`.

     The JSON representation for \`StringValue\` is JSON string.
    """
    type GoogleProtobufStringValue {
      """
      Fake field because GraphQL does not support empty objects. Do not query, use __typename instead.
      """
      _: Boolean

      """The string value."""
      value: String
    }

    """
    Wrapper message for \`string\`.

     The JSON representation for \`StringValue\` is JSON string.
    """
    input GoogleProtobufStringValueInput {
      """
      Fake field because GraphQL does not support empty input. Do not use, It does nothing.
      """
      _: Boolean

      """The string value."""
      value: String
    }

    """
    A Timestamp represents a point in time independent of any time zone or local
     calendar, encoded as a count of seconds and fractions of seconds at
     nanosecond resolution. The count is relative to an epoch at UTC midnight on
     January 1, 1970, in the proleptic Gregorian calendar which extends the
     Gregorian calendar backwards to year one.

     All minutes are 60 seconds long. Leap seconds are "smeared" so that no leap
     second table is needed for interpretation, using a [24-hour linear
     smear](https://developers.google.com/time/smear).

     The range is from 0001-01-01T00:00:00Z to 9999-12-31T23:59:59.999999999Z. By
     restricting to that range, we ensure that we can convert to and from [RFC
     3339](https://www.ietf.org/rfc/rfc3339.txt) date strings.

     # Examples

     Example 1: Compute Timestamp from POSIX \`time()\`.

         Timestamp timestamp;
         timestamp.set_seconds(time(NULL));
         timestamp.set_nanos(0);

     Example 2: Compute Timestamp from POSIX \`gettimeofday()\`.

         struct timeval tv;
         gettimeofday(&tv, NULL);

         Timestamp timestamp;
         timestamp.set_seconds(tv.tv_sec);
         timestamp.set_nanos(tv.tv_usec * 1000);

     Example 3: Compute Timestamp from Win32 \`GetSystemTimeAsFileTime()\`.

         FILETIME ft;
         GetSystemTimeAsFileTime(&ft);
         UINT64 ticks = (((UINT64)ft.dwHighDateTime) << 32) | ft.dwLowDateTime;

         // A Windows tick is 100 nanoseconds. Windows epoch 1601-01-01T00:00:00Z
         // is 11644473600 seconds before Unix epoch 1970-01-01T00:00:00Z.
         Timestamp timestamp;
         timestamp.set_seconds((INT64) ((ticks / 10000000) - 11644473600LL));
         timestamp.set_nanos((INT32) ((ticks % 10000000) * 100));

     Example 4: Compute Timestamp from Java \`System.currentTimeMillis()\`.

         long millis = System.currentTimeMillis();

         Timestamp timestamp = Timestamp.newBuilder().setSeconds(millis / 1000)
             .setNanos((int) ((millis % 1000) * 1000000)).build();

     Example 5: Compute Timestamp from Java \`Instant.now()\`.

         Instant now = Instant.now();

         Timestamp timestamp =
             Timestamp.newBuilder().setSeconds(now.getEpochSecond())
                 .setNanos(now.getNano()).build();

     Example 6: Compute Timestamp from current time in Python.

         timestamp = Timestamp()
         timestamp.GetCurrentTime()

     # JSON Mapping

     In JSON format, the Timestamp type is encoded as a string in the
     [RFC 3339](https://www.ietf.org/rfc/rfc3339.txt) format. That is, the
     format is "{year}-{month}-{day}T{hour}:{min}:{sec}[.{frac_sec}]Z"
     where {year} is always expressed using four digits while {month}, {day},
     {hour}, {min}, and {sec} are zero-padded to two digits each. The fractional
     seconds, which can go up to 9 digits (i.e. up to 1 nanosecond resolution),
     are optional. The "Z" suffix indicates the timezone ("UTC"); the timezone
     is required. A proto3 JSON serializer should always use UTC (as indicated by
     "Z") when printing the Timestamp type and a proto3 JSON parser should be
     able to accept both UTC and other timezones (as indicated by an offset).

     For example, "2017-01-15T01:30:15.01Z" encodes 15.01 seconds past
     01:30 UTC on January 15, 2017.

     In JavaScript, one can convert a Date object to this format using the
     standard
     [toISOString()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toISOString)
     method. In Python, a standard \`datetime.datetime\` object can be converted
     to this format using
     [\`strftime\`](https://docs.python.org/2/library/time.html#time.strftime) with
     the time format spec '%Y-%m-%dT%H:%M:%S.%fZ'. Likewise, in Java, one can use
     the Joda Time's [\`ISODateTimeFormat.dateTime()\`](
     http://joda-time.sourceforge.net/apidocs/org/joda/time/format/ISODateTimeFormat.html#dateTime()
     ) to obtain a formatter capable of generating timestamps in this format.
    """
    type GoogleProtobufTimestamp {
      """
      Fake field because GraphQL does not support empty objects. Do not query, use __typename instead.
      """
      _: Boolean

      """
      Non-negative fractions of a second at nanosecond resolution. Negative
       second values with fractions must still have non-negative nanos values
       that count forward in time. Must be from 0 to 999,999,999
       inclusive.
      """
      nanos: Int

      """
      Represents seconds of UTC time since Unix epoch
       1970-01-01T00:00:00Z. Must be from 0001-01-01T00:00:00Z to
       9999-12-31T23:59:59Z inclusive.
      """
      seconds: String
    }

    type Mutation {
      """Create a new post"""
      postV1PostServiceCreatePost(
        """Create Post Request"""
        input: PostV1CreatePostRequestInput!
      ): PostV1Post

      """Delete a post"""
      postV1PostServiceDeletePost(
        """Delete Post Request"""
        input: PostV1DeletePostRequestInput!
      ): GoogleProtobufEmpty

      """Update an existing post"""
      postV1PostServiceUpdatePost(
        """Update Post Request"""
        input: PostV1UpdatePostRequestInput!
      ): PostV1Post

      """Create a new user"""
      userV1UserServiceCreateUser(
        """Create"""
        input: UserV1CreateUserRequestInput!
      ): UserV1CreateUserResponse

      """Delete a user"""
      userV1UserServiceDeleteUser(
        """Delete"""
        input: UserV1DeleteUserRequestInput!
      ): UserV1DeleteUserResponse

      """Update an existing user"""
      userV1UserServiceUpdateUser(
        """Update"""
        input: UserV1UpdateUserRequestInput!
      ): UserV1UpdateUserResponse
    }

    """Create Post Request"""
    input PostV1CreatePostRequestInput {
      """
      Fake field because GraphQL does not support empty input. Do not use, It does nothing.
      """
      _: Boolean
      authorId: String
      category: PostV1PostCategory
      content: String
      metadata: [StringMapEntryInput!]
      status: PostV1PostStatus
      tags: [String!]
      title: String
    }

    """Delete Post Request"""
    input PostV1DeletePostRequestInput {
      """
      Fake field because GraphQL does not support empty input. Do not use, It does nothing.
      """
      _: Boolean
      id: String
    }

    """Get Post Request"""
    input PostV1GetPostRequestInput {
      """
      Fake field because GraphQL does not support empty input. Do not use, It does nothing.
      """
      _: Boolean
      id: String
    }

    """Get Post with Author"""
    input PostV1GetPostWithAuthorRequestInput {
      """
      Fake field because GraphQL does not support empty input. Do not use, It does nothing.
      """
      _: Boolean
      author: UserV1UserInput
      id: String
    }

    """List Posts Request"""
    input PostV1ListPostsRequestInput {
      """
      Fake field because GraphQL does not support empty input. Do not use, It does nothing.
      """
      _: Boolean
      category: PostV1PostCategory
      filter: PostV1PostListFilter
      pageSize: Int
      pageToken: String
    }

    """List Posts Response"""
    type PostV1ListPostsResponse {
      """
      Fake field because GraphQL does not support empty objects. Do not query, use __typename instead.
      """
      _: Boolean
      nextPageToken: String
      posts: [PostV1Post!]
      totalCount: Int
    }

    """Post message"""
    type PostV1Post {
      """
      Fake field because GraphQL does not support empty objects. Do not query, use __typename instead.
      """
      _: Boolean

      """Reference to User"""
      authorId: String
      category: PostV1PostCategory
      content: String
      createdAt: GoogleProtobufTimestamp
      id: ID

      """Metadata as key-value pairs"""
      metadata: [StringMapEntry!] @deprecated(reason: "Deprecated. See the comments for more details.")
      rawId: String
      status: PostV1PostStatus
      tags: [String!]
      title: String
      updatedAt: GoogleProtobufTimestamp
    }

    """Category enum for posts"""
    enum PostV1PostCategory {
      FOOD
      HEALTH
      LIFESTYLE
      TECHNOLOGY
      TRAVEL
      UNSPECIFIED
    }

    """Filter type for listing posts"""
    enum PostV1PostListFilter {
      ALL
      ARCHIVED
      DRAFTS
      PUBLISHED
    }

    """Post status enum"""
    enum PostV1PostStatus {
      ARCHIVED
      DRAFT
      PUBLISHED
      UNSPECIFIED
    }

    type PostV1PostWithAuthor {
      """
      Fake field because GraphQL does not support empty objects. Do not query, use __typename instead.
      """
      _: Boolean
      author: UserV1User
      post: PostV1Post
    }

    """Update Post Request"""
    input PostV1UpdatePostRequestInput {
      """
      Fake field because GraphQL does not support empty input. Do not use, It does nothing.
      """
      _: Boolean
      category: PostV1PostCategory
      content: String
      id: String
      metadata: [StringMapEntryInput!]
      status: PostV1PostStatus
      tags: [String!]
      title: String
    }

    type Query {
      """Get a post by ID"""
      postV1PostServiceGetPost(
        """Get Post Request"""
        input: PostV1GetPostRequestInput!
      ): PostV1Post

      """Get post with author information"""
      postV1PostServiceGetPostWithAuthor(
        """Get Post with Author"""
        input: PostV1GetPostWithAuthorRequestInput!
      ): PostV1PostWithAuthor

      """List posts with filtering"""
      postV1PostServiceListPosts(
        """List Posts Request"""
        input: PostV1ListPostsRequestInput!
      ): PostV1ListPostsResponse

      """Get a user by ID"""
      userV1UserServiceGetUser(
        """Read"""
        input: UserV1GetUserRequestInput!
      ): UserV1GetUserResponse

      """List users with optional filtering"""
      userV1UserServiceListUsers(
        """List"""
        input: UserV1ListUsersRequestInput!
      ): UserV1ListUsersResponse
    }

    """Key-value pair for the map field metadata of STRING."""
    type StringMapEntry {
      key: String
      value: String!
    }

    """Key-value pair for the map field metadata of STRING."""
    input StringMapEntryInput {
      key: String!
      value: String!
    }

    """Create"""
    input UserV1CreateUserRequestInput {
      """
      Fake field because GraphQL does not support empty input. Do not use, It does nothing.
      """
      _: Boolean
      email: String
      metadata: [StringMapEntryInput!]
      name: String
      role: UserV1UserRole
      tags: [String!]
    }

    type UserV1CreateUserResponse {
      """
      Fake field because GraphQL does not support empty objects. Do not query, use __typename instead.
      """
      _: Boolean
      user: UserV1User
    }

    """Delete"""
    input UserV1DeleteUserRequestInput {
      """
      Fake field because GraphQL does not support empty input. Do not use, It does nothing.
      """
      _: Boolean
      id: String
    }

    type UserV1DeleteUserResponse {
      """
      Fake field because GraphQL does not support empty objects. Do not query, use __typename instead.
      """
      _: Boolean
      success: Boolean
    }

    """Read"""
    input UserV1GetUserRequestInput {
      """
      Fake field because GraphQL does not support empty input. Do not use, It does nothing.
      """
      _: Boolean
      id: String
    }

    type UserV1GetUserResponse {
      """
      Fake field because GraphQL does not support empty objects. Do not query, use __typename instead.
      """
      _: Boolean
      user: UserV1User
    }

    type UserV1Group {
      """
      Fake field because GraphQL does not support empty objects. Do not query, use __typename instead.
      """
      _: Boolean
      id: ID
      name: String
      rawId: String
    }

    input UserV1GroupInput {
      """
      Fake field because GraphQL does not support empty input. Do not use, It does nothing.
      """
      _: Boolean
      id: String
      name: String
    }

    """Key-value pair for the map field groups of user.v1.Group."""
    type UserV1Group_GroupsMapEntry {
      key: String
      value: UserV1Group!
    }

    """Key-value pair for the map field groups of user.v1.Group."""
    input UserV1Group_GroupsMapEntryInput {
      key: String!
      value: UserV1GroupInput!
    }

    """List"""
    input UserV1ListUsersRequestInput {
      """
      Fake field because GraphQL does not support empty input. Do not use, It does nothing.
      """
      _: Boolean
      pageSize: Int
      pageToken: String
      role: UserV1UserRole

      """Enum fields for filtering"""
      status: UserV1User_UserStatus
    }

    type UserV1ListUsersResponse {
      """
      Fake field because GraphQL does not support empty objects. Do not query, use __typename instead.
      """
      _: Boolean
      nextPageToken: String
      totalCount: Int
      users: [UserV1User!]
    }

    """Update"""
    input UserV1UpdateUserRequestInput {
      """
      Fake field because GraphQL does not support empty input. Do not use, It does nothing.
      """
      _: Boolean
      email: String
      id: String
      metadata: [StringMapEntryInput!]
      name: String
      role: UserV1UserRole
      status: UserV1User_UserStatus
      tags: [String!]
    }

    type UserV1UpdateUserResponse {
      """
      Fake field because GraphQL does not support empty objects. Do not query, use __typename instead.
      """
      _: Boolean
      user: UserV1User
    }

    """Main User message"""
    type UserV1User {
      """
      Fake field because GraphQL does not support empty objects. Do not query, use __typename instead.
      """
      _: Boolean
      createdAt: String

      """Field using StringValue well-known type"""
      description: String
      email: String
      groups: [UserV1Group_GroupsMapEntry!]
      id: ID

      """Map type field"""
      metadata: [StringMapEntry!]
      name: String
      rawId: String
      role: UserV1UserRole
      status: UserV1User_UserStatus
      tags: [String!]
      updatedAt: String
    }

    """Main User message"""
    input UserV1UserInput {
      """
      Fake field because GraphQL does not support empty input. Do not use, It does nothing.
      """
      _: Boolean
      createdAt: String

      """Field using StringValue well-known type"""
      description: String
      email: String
      groups: [UserV1Group_GroupsMapEntryInput!]
      id: String

      """Map type field"""
      metadata: [StringMapEntryInput!]
      name: String
      role: UserV1UserRole
      status: UserV1User_UserStatus
      tags: [String!]
      updatedAt: String
    }

    """User role enum type"""
    enum UserV1UserRole {
      ROLE_ADMIN
      ROLE_GUEST
      ROLE_UNSPECIFIED
      ROLE_USER
    }

    """User status enum type for filtering"""
    enum UserV1User_UserStatus {
      STATUS_ACTIVE
      STATUS_INACTIVE
      STATUS_SUSPENDED
      STATUS_UNSPECIFIED
    }"
  `);
});
