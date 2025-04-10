# n-validate
A TypeScript validation framework for building robust validation rules and validators.

## Features
- Built-in validation rules for numbers, booleans and strings
- Custom validation rule support
- Collection validation
- Property validation with fluent API
- Extensible architecture

## Installation
```bash
# Using npm
npm install @nivinjoseph/n-validate

# Using yarn
yarn add @nivinjoseph/n-validate
```

## Usage

### Basic Validation
```typescript
import { Validator } from "@nivinjoseph/n-validate";

interface User {
    name: string;
    age: number;
    email: string;
    contactPreference: "email" | "phone";
    phone?: string;  // Optional field
    middleName?: string;  // Optional field
    notes?: string;  // Optional field
}

const validator = new Validator<User>();

// Required fields use isRequired()
validator.prop("name")
    .isRequired()
    .isString()
    .hasMinLength(3);
    
validator.prop("age")
    .isRequired()
    .isNumber()
    .hasMinValue(18)
    .withMessage("User must be at least 18 years old");
    
// Optional fields use isOptional()
validator.prop("middleName")
    .isOptional()
    .isString()
    .hasMinLength(2)
    .withMessage("Middle name must be at least 2 characters if provided");

// Optional field with conditional validation
validator.prop("phone")
    .isOptional()
    .isString()
    .when(user => user.contactPreference === "phone")
    .isPhoneNumber()
    .withMessage("Please provide a valid phone number");

// Optional field with no additional validation
validator.prop("notes")
    .isOptional()
    .isString();

const user = {
    name: "John",
    age: 25,
    email: "john@example.com",
    contactPreference: "email"
};

validator.validate(user);
console.log(validator.isValid); // true
```

### Boolean Validation
```typescript
import { Validator } from "@nivinjoseph/n-validate";

const validator = new Validator<{ isOnline: boolean }>();
validator.prop("isOnline")
    .isRequired()
    .isBoolean();
```

### Number Validation
```typescript
import { Validator, numval } from "@nivinjoseph/n-validate";

const validator = new Validator<{ score: number }>();
validator.prop("score")
    .isRequired()
    .isNumber()
    .hasMinValue(0)
    .hasMaxValue(100)
    .isInNumbers([0, 25, 50, 75, 100]);
```

### String Validation
```typescript
import { Validator, strval } from "@nivinjoseph/n-validate";

const validator = new Validator<{ phone: string }>();
validator.prop("phone")
    .isRequired()
    .isString()
    .hasExactLength(10)
    .containsOnlyNumbers();
```

### Collection Validation
```typescript
import { Validator } from "@nivinjoseph/n-validate";

interface Order {
    items: Array<{ quantity: number; price: number }>;
}

const itemValidator = new Validator<{ quantity: number; price: number }>();
itemValidator.prop("quantity")
    .isRequired()
    .isNumber()
    .hasMinValue(1);
itemValidator.prop("price")
    .isRequired()
    .isNumber()
    .hasMinValue(0);

const orderValidator = new Validator<Order>();
orderValidator.prop("items")
    .isRequired()
    .isArray()
    .useCollectionValidator(itemValidator);
```


### Enum Validation with isEnum()
The `isEnum()` method validates that a value is a valid enum value. It can be used with both string and number enums.

```typescript
// String enum example
enum UserRole {
    Admin = "admin",
    User = "user",
    Guest = "guest"
}

interface User {
    role: UserRole;
    status?: UserStatus;  // Optional enum
}

// Number enum example
enum UserStatus {
    Active = 1,
    Inactive = 0,
    Suspended = 2
}

const validator = new Validator<User>();

// Required enum validation
validator.prop("role")
    .isRequired()
    .isString()
    .isEnum(UserRole)
    .withMessage("Invalid user role");

// Optional enum validation
validator.prop("status")
    .isOptional()
    .isNumber()
    .isEnum(UserStatus)
    .withMessage("Invalid user status");

// Using with other validation methods
validator.prop("role")
    .isRequired()
    .isEnum(UserRole)
    .when(user => user.role === UserRole.Admin)
    .withMessage("Admin role requires additional verification");
```

### Conditional Validation with when()
The `when()` method can be used in two ways:

1. **After prop()**: When used right after `prop()`, it determines whether any validation rules for that property will be executed.
2. **After a specific rule**: When used after a specific rule, it determines whether that particular rule should be executed.

```typescript
interface Order {
    paymentMethod: "credit" | "cash";
    creditCardNumber?: string;
    cashAmount?: number;
    isInternational: boolean;
    taxId?: string;
}

const validator = new Validator<Order>();
validator.prop("paymentMethod").isRequired();

// Skip all validation rules for a property
validator.prop("creditCardNumber")
    .when(order => order.paymentMethod === "credit") // Skips all validations if false
    .isRequired()
    .hasExactLength(16)
    .containsOnlyNumbers()
    .withMessage("Please provide a valid 16-digit credit card number");

// Apply when() to specific rules
validator.prop("taxId")
    .isRequired()
    .matchesRegex(/^[A-Z]{2}\d{9}$/)
    .when(order => order.isInternational) // Only applies to regex validation
    .withMessage("International orders require a valid tax ID");

// Multiple when() conditions
validator.prop("cashAmount")
    .isRequired()
    .hasMinValue(0)
    .when(order => order.paymentMethod === "cash") // Applies to hasMinValue()
    .hasMaxValue(1000)
    .when(order => order.isInternational) // Applies to hasMaxValue()
    .withMessage("International cash payments cannot exceed 1000");
```

### Custom Error Messages with withMessage()
The `withMessage()` method can be applied to individual validation rules to provide specific error messages for each validation failure.

```typescript
interface Product {
    name: string;
    price: number;
    discount?: number;
    category: string;
}

const validator = new Validator<Product>();
validator.prop("name")
    .isRequired()
    .withMessage("Product name is required")
    .hasMinLength(3)
    .withMessage("Product name must be at least 3 characters long");

validator.prop("price")
    .isRequired()
    .withMessage("Price is required")
    .hasMinValue(0)
    .withMessage("Price cannot be negative")
    .when(product => product.category === "premium")
    .hasMinValue(100)
    .withMessage("Premium products must cost at least 100");

validator.prop("discount")
    .when(product => product.discount != null)
    .hasMinValue(0)
    .withMessage("Discount cannot be negative")
    .hasMaxValue(100)
    .withMessage(value => `Discount percentage must be between 0 and 100, got ${value}`);
```

### Optional Fields with isOptional()
The `isOptional()` method is used for nullable or optional fields. When a field is marked as optional:
- The field can be null, undefined, or not present in the object
- If the field has a value, it must meet any additional validation rules
- No validation rules are applied if the field is null/undefined/not present

```typescript
interface User {
    name: string;
    notes?: string;  // Optional field
}

const validator = new Validator<User>();

// Required fields
validator.prop("name")
    .isRequired()
    .isString()
    .hasMinLength(3);

validator.prop("notes")
    .isOptional()
    .isString()
    .hasMaxLength(500)
    .withMessage("Notes cannot exceed 500 characters");
```


## API Documentation

### Built-in Validation Rules

#### Boolean Validation
- isBoolean() - Ensures the value is a boolean
- isRequired() - Ensures the value is not null/undefined
- isOptional() - Makes the field optional
- when(condition) - Conditionally applies validation rules
- withMessage(message) - Sets custom error message

#### Number Validation
- isNumber() - Ensures the value is a number
- isRequired() - Ensures the value is not null/undefined
- isOptional() - Makes the field optional
- hasMinValue(minValue) - Ensures value is >= minValue
- hasMaxValue(maxValue) - Ensures value is <= maxValue
- hasExactValue(exactValue) - Ensures value equals exactValue
- isIn(values) - Ensures value is in the specified array
- isNotIn(values) - Ensures value is not in the specified array
- isEnum(enumType) - Ensures value is a valid enum value
- when(condition) - Conditionally applies validation rules
- withMessage(message) - Sets custom error message

#### String Validation
- isString() - Ensures the value is a string
- isRequired() - Ensures the value is not null/undefined
- isOptional() - Makes the field optional
- hasMinLength(minLength) - Ensures string length >= minLength
- hasMaxLength(maxLength) - Ensures string length <= maxLength
- hasExactLength(exactLength) - Ensures string length equals exactLength
- isIn(values, ignoreCase?) - Ensures value is in the specified array
- isNotIn(values, ignoreCase?) - Ensures value is not in the specified array
- containsOnlyNumbers() - Ensures string contains only numeric characters
- isPhoneNumber() - Ensures value is a valid phone number
- isEmail() - Ensures value is a valid email address
- isDate(format) - Ensures value is a valid date string in specified format
- matchesRegex(regex) - Ensures value matches the regular expression
- isEnum(enumType) - Ensures value is a valid enum value
- when(condition) - Conditionally applies validation rules
- withMessage(message) - Sets custom error message

#### Collection Validation
- isArray() - Ensures the value is an array
- isRequired() - Ensures the value is not null/undefined
- isOptional() - Makes the field optional
- useCollectionValidator(validator) - Validates each item in the array
- when(condition) - Conditionally applies validation rules
- withMessage(message) - Sets custom error message

### Example Usage
```typescript
const validator = new Validator<User>();

// Boolean validation
validator.prop("isActive").isRequired().isBoolean();

// Number validation
validator.prop("age").isRequired().hasMinValue(18).hasMaxValue(100);

// String validation
validator.prop("email").isRequired().isEmail();
validator.prop("phone").isOptional().isPhoneNumber();

// Collection validation
validator.prop("addresses")
    .isRequired()
    .useCollectionValidator(addressValidator);
```

## Contributing
Contributions are welcome! Please follow the existing code style and include tests for new features.

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
