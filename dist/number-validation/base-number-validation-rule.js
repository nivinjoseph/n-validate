import { BaseValidationRule } from "./../base-validation-rule.js";
// public
export class BaseNumberValidationRule extends BaseValidationRule {
    constructor() {
        super();
        this.addValidationRule({
            validate: (t) => typeof t === "number",
            error: "Invalid value"
        });
    }
}
//# sourceMappingURL=base-number-validation-rule.js.map