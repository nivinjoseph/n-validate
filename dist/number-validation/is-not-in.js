"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const base_number_validation_rule_1 = require("./base-number-validation-rule");
const n_defensive_1 = require("@nivinjoseph/n-defensive");
function isNotIn(values) {
    return new NumberIsNotIn(values);
}
exports.isNotIn = isNotIn;
class NumberIsNotIn extends base_number_validation_rule_1.BaseNumberValidationRule {
    constructor(values) {
        n_defensive_1.given(values, "values").ensureHasValue();
        super();
        this.addValidationRule({
            validate: t => t == null || values.every(u => u !== t),
            error: "Invalid value"
        });
    }
}
//# sourceMappingURL=is-not-in.js.map