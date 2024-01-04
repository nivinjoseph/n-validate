import { given } from "@nivinjoseph/n-defensive";
import { BaseStringValidationRule } from "./base-string-validation-rule.js";
// public
export function hasMinLength(minLength) {
    return new StringHasMinLength(minLength);
}
class StringHasMinLength extends BaseStringValidationRule {
    constructor(minLength) {
        given(minLength, "minLength").ensureHasValue();
        super();
        this.addValidationRule({
            // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
            validate: t => t == null || t.trim().length >= minLength,
            error: `Min length of ${minLength} required`
        });
    }
}
//# sourceMappingURL=has-min-length.js.map