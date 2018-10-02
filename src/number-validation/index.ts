import { BaseNumberValidationRule } from "./base-number-validation-rule";
import { hasMinValue } from "./has-min-value";
import { hasMaxValue } from "./has-max-value";
import { isIn } from "./is-in";
import { isNotIn } from "./is-not-in";

let numval = { hasMinValue, hasMaxValue, isIn, isNotIn };

export
{
    BaseNumberValidationRule,
    numval
};