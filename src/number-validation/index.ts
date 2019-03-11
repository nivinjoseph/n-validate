import { BaseNumberValidationRule } from "./base-number-validation-rule";
import { hasMinValue } from "./has-min-value";
import { hasMaxValue } from "./has-max-value";
import { isIn } from "./is-in";
import { isNotIn } from "./is-not-in";
import { hasExactValue } from "./has-exact-value";


const numval = { hasMinValue, hasMaxValue, hasExactValue, isIn, isNotIn };


export
{
    BaseNumberValidationRule,
    numval
};