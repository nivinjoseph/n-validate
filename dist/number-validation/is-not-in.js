import { given } from "@nivinjoseph/n-defensive";
import { BaseNumberValidationRule } from "./base-number-validation-rule.js";
// public
export function isNotIn(values) {
    return new NumberIsNotIn(values);
}
class NumberIsNotIn extends BaseNumberValidationRule {
    constructor(values) {
        given(values, "values").ensureHasValue();
        super();
        this.addValidationRule({
            // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
            validate: t => t == null || values.every(u => u !== t),
            error: "Invalid value"
        });
    }
}
//# sourceMappingURL=is-not-in.js.map