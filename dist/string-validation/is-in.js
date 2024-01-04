import { given } from "@nivinjoseph/n-defensive";
import { BaseStringValidationRule } from "./base-string-validation-rule.js";
export function isIn(values, ignoreCase) {
    return new StringIsIn(values, !!ignoreCase);
}
class StringIsIn extends BaseStringValidationRule {
    constructor(values, ignoreCase) {
        given(values, "values").ensureHasValue();
        super();
        this.addValidationRule({
            // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
            validate: t => t == null || (ignoreCase
                ? values.some(v => v.trim().toLowerCase() === t.trim().toLowerCase())
                : values.some(v => v.trim() === t.trim())),
            error: "Invalid value"
        });
    }
}
//# sourceMappingURL=is-in.js.map