"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.containsOnlyNumbers = void 0;
const base_string_validation_rule_1 = require("./base-string-validation-rule");
// public
function containsOnlyNumbers() {
    return new StringContainsOnlyNumbers();
}
exports.containsOnlyNumbers = containsOnlyNumbers;
class StringContainsOnlyNumbers extends base_string_validation_rule_1.BaseStringValidationRule {
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