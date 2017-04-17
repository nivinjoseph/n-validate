import { ValidationRule } from "./../validation-rule";
import { BaseStringValidationRule } from "./base-string-validation-rule";
declare let strval: {
    hasMinLength: (minLength: number) => ValidationRule<string>;
    hasMaxLength: (maxLength: number) => ValidationRule<string>;
    hasExactLength: (exactLength: number) => ValidationRule<string>;
    isIn: {
        (values: string[]): ValidationRule<string>;
        (values: string[], ignoreCase: boolean): ValidationRule<string>;
    };
    isNotIn: {
        (values: string[]): ValidationRule<string>;
        (values: string[], ignoreCase: boolean): ValidationRule<string>;
    };
    containsOnlyNumbers: () => ValidationRule<string>;
    isPhoneNumber: () => ValidationRule<string>;
    isEmail: () => ValidationRule<string>;
};
export { BaseStringValidationRule, strval };
