# ID Field Handling

Protocol Buffer messages often contain identifier fields (typically named `id`). This plugin provides special handling for these ID fields to make them compatible with GraphQL conventions and improve client-side data handling capabilities.

## ID Field Processing

When the plugin encounters a field named `id` in a Protocol Buffer message, it applies the following transformations:

1. The field is converted to the GraphQL `ID` scalar type
2. The value is encoded in Base64 format using the pattern `typeName:originalId`
3. An additional `rawId` field is added to provide access to the original, unencoded ID value

This processing creates globally unique identifiers across your GraphQL schema, following the best practices recommended for GraphQL APIs.

## Why Encode ID Fields?

The encoding approach has several benefits:

1. **Global Uniqueness**: By prefixing the ID with the type name, you ensure uniqueness across different entity types
2. **Client-Side Caching**: GraphQL clients like Relay or Apollo Client can use these globally unique IDs for normalized caching
3. **Type Information**: The encoded ID contains information about which type the ID belongs to

## The rawId Field

The plugin automatically adds a `rawId` field to any type that has an `id` field. This field:

- Returns the original, unencoded ID value as a string
- Allows direct access to the original identifier when needed
- Facilitates easier integration with external systems that expect the original ID

## Example

Given a Protocol Buffer message with an ID field:

```protobuf
message User {
  int64 id = 1;
  string name = 2;
}
```

The plugin will generate a GraphQL type with:

1. An `id` field of type `ID` that returns the Base64-encoded value (e.g., `VXNlcjoxMjM=` for User:123)
2. A `rawId` field of type `String` that returns the original ID value (e.g., `123`)

This results in a GraphQL schema like:

```graphql
type User {
  id: ID!
  rawId: String!
  name: String
}
```

## Configuration Options

You can control ID field handling using plugin configuration options. For details on how to configure this behavior, please refer to the [Configuration documentation](../configuration.md).

Available options include:
- `disable_process_id_field`: Turns off the automatic processing of ID fields
- `disable_add_raw_id_field`: Disables the addition of the rawId field
