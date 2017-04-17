import { ValidationRule } from "./../validation-rule";
import { BaseNumberValidationRule } from "./base-number-validation-rule";
declare let numval: {
    hasMinValue: (minValue: number) => ValidationRule<number>;
    hasMaxValue: (maxValue: number) => ValidationRule<number>;
    isIn: (values: number[]) => ValidationRule<number>;
    isNotIn: (values: number[]) => ValidationRule<number>;
};
export { BaseNumberValidationRule, numval };
