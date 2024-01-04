import { BaseNumberValidationRule } from "./base-number-validation-rule.js";
import { hasMinValue } from "./has-min-value.js";
import { hasMaxValue } from "./has-max-value.js";
import { isIn } from "./is-in.js";
import { isNotIn } from "./is-not-in.js";
import { hasExactValue } from "./has-exact-value.js";
declare const numval: {
    hasMinValue: typeof hasMinValue;
    hasMaxValue: typeof hasMaxValue;
    hasExactValue: typeof hasExactValue;
    isIn: typeof isIn;
    isNotIn: typeof isNotIn;
};
export { BaseNumberValidationRule, numval };
//# sourceMappingURL=index.d.ts.map