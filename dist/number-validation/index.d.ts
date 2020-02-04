import { BaseNumberValidationRule } from "./base-number-validation-rule";
import { hasMinValue } from "./has-min-value";
import { hasMaxValue } from "./has-max-value";
import { isIn } from "./is-in";
import { isNotIn } from "./is-not-in";
import { hasExactValue } from "./has-exact-value";
declare const numval: {
    hasMinValue: typeof hasMinValue;
    hasMaxValue: typeof hasMaxValue;
    hasExactValue: typeof hasExactValue;
    isIn: typeof isIn;
    isNotIn: typeof isNotIn;
};
export { BaseNumberValidationRule, numval };
