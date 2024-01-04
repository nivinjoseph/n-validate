import { given } from "@nivinjoseph/n-defensive";
import { BaseStringValidationRule } from "./base-string-validation-rule.js";
export function isNotIn(values, ignoreCase) {
    return new StringIsNotIn(values, !!ignoreCase);
}
class StringIsNotIn extends BaseStringValidationRule {
    constructor(values, ignoreCase) {
        given(values, "values").ensureHasValue();
        super();
        this.addValidationRule({
            // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
            validate: t => t == null || (ignoreCase
                ? values.every(v => v.trim().toLowerCase() !== t.trim().toLowerCase())
                : values.every(v => v.trim() !== t.trim())),
            error: "Invalid value"
        });
    }
}
//# sourceMappingURL=is-not-in.js.map