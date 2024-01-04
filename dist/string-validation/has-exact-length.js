import { given } from "@nivinjoseph/n-defensive";
import { BaseStringValidationRule } from "./base-string-validation-rule.js";
// public
export function hasExactLength(exactLength) {
    return new StringHasExactLength(exactLength);
}
class StringHasExactLength extends BaseStringValidationRule {
    constructor(exactLength) {
        given(exactLength, "exactLength").ensureHasValue();
        super();
        this.addValidationRule({
            // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
            validate: t => t == null || t.trim().length === exactLength,
            error: `Exact length of ${exactLength} required`
        });
    }
}
//# sourceMappingURL=has-exact-length.js.map