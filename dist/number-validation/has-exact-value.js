import { given } from "@nivinjoseph/n-defensive";
import { BaseNumberValidationRule } from "./base-number-validation-rule.js";
// public
export function hasExactValue(exactValue) {
    return new NumberHasExactValue(exactValue);
}
class NumberHasExactValue extends BaseNumberValidationRule {
    constructor(exactValue) {
        given(exactValue, "exactValue").ensureHasValue();
        super();
        this.addValidationRule({
            // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
            validate: t => t == null || t === exactValue,
            error: `Value has to be ${exactValue}`
        });
    }
}
//# sourceMappingURL=has-exact-value.js.map