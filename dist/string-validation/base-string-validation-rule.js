import { BaseValidationRule } from "./../base-validation-rule.js";
// public
export class BaseStringValidationRule extends BaseValidationRule {
    constructor() {
        super();
        this.addValidationRule({
            validate: t => typeof t === "string",
            error: "Invalid value"
        });
    }
    isNumber(value) {
        const val = value.toString().trim();
        if (val.length === 0)
            return false;
        const parsed = +val;
        return !isNaN(parsed) && isFinite(parsed);
    }
}
//# sourceMappingURL=base-string-validation-rule.js.map