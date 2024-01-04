import { given } from "@nivinjoseph/n-defensive";
import { BaseStringValidationRule } from "./base-string-validation-rule.js";
// public
export function hasMaxLength(maxLength) {
    return new StringHasMaxLength(maxLength);
}
class StringHasMaxLength extends BaseStringValidationRule {
    constructor(maxLength) {
        given(maxLength, "maxLength").ensureHasValue();
        super();
        this.addValidationRule({
            // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
            validate: t => t == null || t.trim().length <= maxLength,
            error: `Max length of ${maxLength} required`
        });
    }
}
//# sourceMappingURL=has-max-length.js.map