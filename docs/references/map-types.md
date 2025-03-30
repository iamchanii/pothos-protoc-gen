# Map Types

Protocol Buffers supports map fields (key-value pairs) which are represented as `map<key_type, value_type>` in `.proto` files. In this plugin, map types are handled using specialized GraphQL types that preserve the key-value structure while ensuring type safety.

## Map Type Representation

When converting Protocol Buffer map types to GraphQL:

1. Each map type is represented as an array of entry objects
2. Each entry object contains a `key` and a `value` field
3. Separate types are generated for both input and output contexts

## Map Entry Type Naming

The plugin follows specific naming conventions for map entry types based on the field type:

For scalar value types:
- Map entry object types (output types): `{ScalarTypeName}MapEntry`
- Map entry input types: `{ScalarTypeName}MapEntryInput`

For message or enum value types:
- Map entry object types (output types): `{MapKeyType}_{DescriptorName}MapEntry`
- Map entry input types: `{MapKeyType}_{DescriptorName}MapEntryInput`

Where:
- `ScalarTypeName` is the Pascal-cased GraphQL scalar type name
- `MapKeyType` is the scalar type used for the map key (e.g., String, Int)
- `DescriptorName` is determined by the following rules:
  - If the message/enum has a parent: `{PascalCasedParentTypeName}_{PascalCasedMessageOrEnumName}`
  - If the message/enum has no parent: `{PascalCasedTypeName}`

## Map Entry Types

Each map entry is represented as an object with:

- `key`: The key type from the Protocol Buffer map
- `value`: The value type from the Protocol Buffer map

These types are used when returning map data in queries and mutations.

## Example

Given a Protocol Buffer message with a map:

```protobuf
message User {
  string id = 1;
  map<string, string> attributes = 2;
  map<string, Address> addresses = 3;
}

message Address {
  string street = 1;
  string city = 2;
}
```

The plugin will generate:

1. A `StringMapEntry` object type for the `attributes` field (since it uses string values)
2. A `StringMapEntryInput` input type for the `attributes` field
3. A `String_AddressMapEntry` object type for the `addresses` field (since it uses message values with string keys)
4. A `String_AddressMapEntryInput` input type for the `addresses` field
5. The `User` type will have the fields properly typed as arrays of these entry types

This approach allows for typed key-value operations while maintaining compatibility with GraphQL's type system.