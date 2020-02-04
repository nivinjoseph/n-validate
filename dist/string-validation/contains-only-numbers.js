"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const base_string_validation_rule_1 = require("./base-string-validation-rule");
function containsOnlyNumbers() {
    return new StringContainsOnlyNumbers();
}
exports.containsOnlyNumbers = containsOnlyNumbers;
class StringContainsOnlyNumbers extends base_string_validation_rule_1.BaseStringValidationRule {
    constructor() {
        super();
        this.addValidationRule({
            validate: t => t == null || this.isNumber(t),
            error: "Invalid value"
        });
    }
}
//# sourceMappingURL=contains-only-numbers.js.map