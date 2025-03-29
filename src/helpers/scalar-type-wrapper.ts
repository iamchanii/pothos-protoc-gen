import { ScalarType } from '@bufbuild/protobuf';

/**
 * A wrapper class for ScalarType enum values that provides utility methods
 * for creating, validating, and converting scalar types.
 */
export class ScalarTypeWrapper {
  /**
   * The wrapped scalar type value.
   * @private
   */
  private scalarType: ScalarType;

  /**
   * Creates a new ScalarTypeWrapper instance.
   * @param scalarType - The scalar type to wrap
   */
  constructor(scalarType: ScalarType) {
    this.scalarType = scalarType;
  }

  /**
   * Creates a ScalarTypeWrapper from a ScalarType enum value.
   * @param scalarType - The scalar type enum value
   * @returns A new ScalarTypeWrapper instance
   */
  static fromScalarType(scalarType: ScalarType): ScalarTypeWrapper {
    return new ScalarTypeWrapper(scalarType);
  }

  /**
   * Checks if a string is a valid ScalarType name.
   * @param name - The string to check
   * @returns True if the name corresponds to a ScalarType value
   */
  static isScalarType(name: string): boolean {
    return Object.values(ScalarType).includes(name);
  }

  /**
   * Creates a ScalarTypeWrapper from a string representation of a ScalarType.
   * @param scalarTypeName - The name of the scalar type
   * @returns A new ScalarTypeWrapper instance
   */
  static fromScalarTypeName(scalarTypeName: string): ScalarTypeWrapper {
    return new ScalarTypeWrapper(
      ScalarType[scalarTypeName as keyof typeof ScalarType],
    );
  }

  /**
   * Converts the wrapped scalar type to its string representation.
   * @returns The string name of the scalar type
   */
  toString(): string {
    return ScalarType[this.scalarType] as string;
  }
}
