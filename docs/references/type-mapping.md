# Type Mapping

This document explains how the pothos-protoc-gen plugin maps Protocol Buffer types to GraphQL scalar types. When generating a GraphQL schema from Protobuf definitions, understanding these type mappings is crucial for correctly handling data transformations between your Protobuf services and GraphQL API.

## Basic Scalar Type Mapping

Protocol Buffer scalar types are mapped to GraphQL scalar types according to the following rules. If the plugin encounters an unsupported type during type generation, it will display an error log and default to mapping the type as `String`.

| Protocol Buffer Type | GraphQL Type | Notes |
|----------------------|--------------|-------|
| double, float        | Float        | Represents floating-point values |
| int32, uint32, sint32, fixed32, sfixed32 | Int | Represents 32-bit integer values |
| int64, uint64, sint64, fixed64, sfixed64 | String | Represents 64-bit integer values (see note below) |
| bool                 | Boolean      | Represents true/false values |
| string               | String       | Represents text values |

### 64-bit Integer Handling

GraphQL's `Int` type is a 32-bit signed integer, which cannot represent the full range of 64-bit integers from Protocol Buffers (int64, uint64, etc.). To avoid data loss or precision issues, this plugin converts all 64-bit integer types to `String` in the GraphQL schema.

This approach ensures that:

1. No data is lost during transmission
2. Client applications can parse the string values back to appropriate numeric types
3. The schema remains compatible across all platforms

While this may require additional handling in client code, it provides the most accurate representation of the original data.

## Well-Known Type (WKT) Wrapper Mapping

Protocol Buffers provides special wrapper types for primitive values. These are mapped as follows:

| WKT Wrapper Type | GraphQL Type | Notes |
|------------------|--------------|-------|
| DoubleValue, FloatValue | Float | Represents nullable floating-point values |
| Int32Value, UInt32Value | Int | Represents nullable 32-bit integer values |
| Int64Value, UInt64Value | String | Represents nullable 64-bit integer values |
| BoolValue | Boolean | Represents nullable boolean values |
| StringValue | String | Represents nullable string values |

## Message Field Type Handling

Protocol Buffers message fields are mapped to GraphQL object types based on several criteria:

| Field Kind | GraphQL Type | Notes |
|------------|--------------|-------|
| Scalar     | Corresponding scalar type | Uses the basic scalar mapping shown above |
| Enum       | Enum type    | Named after the enum descriptor |
| Message    | Object type or scalar | If it's a WKT wrapper, maps to the corresponding scalar; otherwise, uses the message name as a type |
| List       | Array of the corresponding type | The array element type follows the same mapping rules |
| Map        | Array of key-value entries | See [Map Types documentation](map-types.md) for details |

When generating input types, the plugin appends 'Input' to message type names to distinguish them from output types. This follows GraphQL's convention of having separate input and output object types.

### Complex Nested Message Handling

For nested message types, the plugin maintains the hierarchical structure by:

1. Creating separate object types for each nested message
2. Maintaining proper references between parent and child messages
3. Applying consistent naming conventions to ensure type uniqueness

### List Field Handling

When a field is a list (repeated in Protobuf), the plugin wraps the corresponding type in an array notation. For example:

- A repeated string becomes `[String]`
- A repeated message becomes `[MessageName]` or `[MessageNameInput]` for input types

