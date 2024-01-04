import { given } from "@nivinjoseph/n-defensive";
import { BaseNumberValidationRule } from "./base-number-validation-rule.js";
// public
export function hasMaxValue(maxValue) {
    return new NumberHasMaxValue(maxValue);
}
class NumberHasMaxValue extends BaseNumberValidationRule {
    constructor(maxValue) {
        given(maxValue, "maxValue").ensureHasValue();
        super();
        this.addValidationRule({
            // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
            validate: t => t == null || t <= maxValue,
            error: `Value cannot be greater than ${maxValue}`
        });
    }
}
//# sourceMappingURL=has-max-value.js.map