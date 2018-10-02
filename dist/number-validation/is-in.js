"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const base_number_validation_rule_1 = require("./base-number-validation-rule");
const n_defensive_1 = require("@nivinjoseph/n-defensive");
function isIn(values) {
    return new NumberIsIn(values);
}
exports.isIn = isIn;
class NumberIsIn extends base_number_validation_rule_1.BaseNumberValidationRule {
    constructor(values) {
        n_defensive_1.given(values, "values").ensureHasValue();
        super();
        this.addValidationRule({
            validate: t => t == null || values.some(u => u === t),
            error: "Invalid value"
        });
    }
}
//# sourceMappingURL=is-in.js.map