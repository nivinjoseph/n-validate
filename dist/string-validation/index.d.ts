import { BaseStringValidationRule } from "./base-string-validation-rule.js";
import { containsOnlyNumbers } from "./contains-only-numbers.js";
import { hasExactLength } from "./has-exact-length.js";
import { hasMaxLength } from "./has-max-length.js";
import { hasMinLength } from "./has-min-length.js";
import { isDate } from "./is-date.js";
import { isEmail } from "./is-email.js";
import { isIn } from "./is-in.js";
import { isNotIn } from "./is-not-in.js";
import { isPhoneNumber } from "./is-phone-number.js";
import { matchesRegex } from "./matches-regex.js";
declare const strval: {
    hasMinLength: typeof hasMinLength;
    hasMaxLength: typeof hasMaxLength;
    hasExactLength: typeof hasExactLength;
    isIn: typeof isIn;
    isNotIn: typeof isNotIn;
    containsOnlyNumbers: typeof containsOnlyNumbers;
    isPhoneNumber: typeof isPhoneNumber;
    isEmail: typeof isEmail;
    isDate: typeof isDate;
    matchesRegex: typeof matchesRegex;
};
export { BaseStringValidationRule, strval };
//# sourceMappingURL=index.d.ts.map