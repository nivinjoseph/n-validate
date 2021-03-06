"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseStringValidationRule = void 0;
const base_validation_rule_1 = require("./../base-validation-rule");
// public
class BaseStringValidationRule extends base_validation_rule_1.BaseValidationRule {
    constructor() {
        super();
        this.addValidationRule({
            validate: t => typeof t === "string",
            error: "Invalid value"
        });
    }
    isNumber(value) {
        value = value.toString().trim();
        if (value.length === 0)
            return false;
        let parsed = +value.toString().trim();
        return !isNaN(parsed) && isFinite(parsed);
    }
}
exports.BaseStringValidationRule = BaseStringValidationRule;
//# sourceMappingURL=base-string-validation-rule.js.map