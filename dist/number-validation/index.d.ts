import { BaseNumberValidationRule } from "./base-number-validation-rule";
import { hasMinValue } from "./has-min-value";
import { hasMaxValue } from "./has-max-value";
import { isIn } from "./is-in";
import { isNotIn } from "./is-not-in";
declare let numval: {
    hasMinValue: typeof hasMinValue;
    hasMaxValue: typeof hasMaxValue;
    isIn: typeof isIn;
    isNotIn: typeof isNotIn;
};
export { BaseNumberValidationRule, numval };
