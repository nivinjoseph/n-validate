import { given } from "@nivinjoseph/n-defensive";
import { BaseNumberValidationRule } from "./base-number-validation-rule.js";
// public
export function hasMinValue(minValue) {
    return new NumberHasMinValue(minValue);
}
class NumberHasMinValue extends BaseNumberValidationRule {
    constructor(minValue) {
        given(minValue, "minValue").ensureHasValue();
        super();
        this.addValidationRule({
            // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
            validate: t => t == null || t >= minValue,
            error: `Value cannot be less than ${minValue}`
        });
    }
}
//# sourceMappingURL=has-min-value.js.map