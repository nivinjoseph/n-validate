import { BaseStringValidationRule } from "./base-string-validation-rule";
import { hasMinLength } from "./has-min-length";
import { hasMaxLength } from "./has-max-length";
import { hasExactLength } from "./has-exact-length";
import { isIn } from "./is-in";
import { isNotIn } from "./is-not-in";
import { containsOnlyNumbers } from "./contains-only-numbers";
import { isPhoneNumber } from "./is-phone-number";
import { isEmail } from "./is-email";
import { isDate } from "./is-date";
import { matchesRegex } from "./matches-regex";


const strval = {
    hasMinLength, hasMaxLength, hasExactLength, isIn, isNotIn, containsOnlyNumbers, isPhoneNumber,
    isEmail, isDate, matchesRegex
};


export
{
    BaseStringValidationRule,
    strval
};