import ValidationRule from "./validation-rule";
import "n-ext";
export declare function hasMinValue(minValue: number): ValidationRule<number>;
export declare function hasMaxValue(maxValue: number): ValidationRule<number>;
export declare function isIn(values: Array<number>): ValidationRule<number>;
export declare function isNotIn(values: Array<number>): ValidationRule<number>;
