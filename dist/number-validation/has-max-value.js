"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const base_number_validation_rule_1 = require("./base-number-validation-rule");
const n_defensive_1 = require("@nivinjoseph/n-defensive");
require("@nivinjoseph/n-ext");
function hasMaxValue(maxValue) {
    return new NumberHasMaxValue(maxValue);
}
exports.hasMaxValue = hasMaxValue;
class NumberHasMaxValue extends base_number_validation_rule_1.BaseNumberValidationRule {
    constructor(maxValue) {
        n_defensive_1.given(maxValue, "maxValue").ensureHasValue();
        super();
        this.addValidationRule({
            validate: t => t == null || t <= maxValue,
            error: "Value cannot be greater than {0}".format(maxValue)
        });
    }
}
//# sourceMappingURL=has-max-value.js.map