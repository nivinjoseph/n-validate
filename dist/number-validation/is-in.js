import { given } from "@nivinjoseph/n-defensive";
import { BaseNumberValidationRule } from "./base-number-validation-rule.js";
// public
export function isIn(values) {
    return new NumberIsIn(values);
}
class NumberIsIn extends BaseNumberValidationRule {
    constructor(values) {
        given(values, "values").ensureHasValue();
        super();
        this.addValidationRule({
            // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
            validate: t => t == null || values.some(u => u === t),
            error: "Invalid value"
        });
    }
}
//# sourceMappingURL=is-in.js.map