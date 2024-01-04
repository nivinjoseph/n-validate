import { BaseStringValidationRule } from "./base-string-validation-rule.js";
// public
export function containsOnlyNumbers() {
    return new StringContainsOnlyNumbers();
}
class StringContainsOnlyNumbers extends BaseStringValidationRule {
    constructor() {
        super();
        this.addValidationRule({
            // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
            validate: t => t == null || this.isNumber(t),
            error: "Invalid value"
        });
    }
}
//# sourceMappingURL=contains-only-numbers.js.map