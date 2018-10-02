"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const base_validation_rule_1 = require("./../base-validation-rule");
class BaseNumberValidationRule extends base_validation_rule_1.BaseValidationRule {
    constructor() {
        super();
        this.addValidationRule({
            validate: (t) => typeof t === "number",
            error: "Invalid value"
        });
    }
}
exports.BaseNumberValidationRule = BaseNumberValidationRule;
//# sourceMappingURL=base-number-validation-rule.js.map