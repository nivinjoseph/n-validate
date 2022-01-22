"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hasExactValue = void 0;
const base_number_validation_rule_1 = require("./base-number-validation-rule");
const n_defensive_1 = require("@nivinjoseph/n-defensive");
// public
function hasExactValue(exactValue) {
    return new NumberHasExactValue(exactValue);
}
exports.hasExactValue = hasExactValue;
class NumberHasExactValue extends base_number_validation_rule_1.BaseNumberValidationRule {
    constructor(exactValue) {
        n_defensive_1.given(exactValue, "exactValue").ensureHasValue();
        super();
        this.addValidationRule({
            validate: t => t == null || t === exactValue,
            error: `Value has to be ${exactValue}`
        });
    }
}
//# sourceMappingURL=has-exact-value.js.map