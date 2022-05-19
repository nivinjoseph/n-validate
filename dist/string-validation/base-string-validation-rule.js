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
        const val = value.toString().trim();
        if (val.length === 0)
            return false;
        const parsed = +val;
        return !isNaN(parsed) && isFinite(parsed);
    }
}
exports.BaseStringValidationRule = BaseStringValidationRule;
//# sourceMappingURL=base-string-validation-rule.js.map