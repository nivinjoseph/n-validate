"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const base_number_validation_rule_1 = require("./base-number-validation-rule");
const n_defensive_1 = require("@nivinjoseph/n-defensive");
require("@nivinjoseph/n-ext");
function hasMinValue(minValue) {
    return new NumberHasMinValue(minValue);
}
exports.hasMinValue = hasMinValue;
class NumberHasMinValue extends base_number_validation_rule_1.BaseNumberValidationRule {
    constructor(minValue) {
        n_defensive_1.given(minValue, "minValue").ensureHasValue();
        super();
        this.addValidationRule({
            validate: t => t == null || t >= minValue,
            error: "Value cannot be less than {0}".format(minValue)
        });
    }
}
//# sourceMappingURL=has-min-value.js.map