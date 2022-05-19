"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isNotIn = void 0;
const base_number_validation_rule_1 = require("./base-number-validation-rule");
const n_defensive_1 = require("@nivinjoseph/n-defensive");
// public
function isNotIn(values) {
    return new NumberIsNotIn(values);
}
exports.isNotIn = isNotIn;
class NumberIsNotIn extends base_number_validation_rule_1.BaseNumberValidationRule {
    constructor(values) {
        (0, n_defensive_1.given)(values, "values").ensureHasValue();
        super();
        this.addValidationRule({
            // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
            validate: t => t == null || values.every(u => u !== t),
            error: "Invalid value"
        });
    }
}
//# sourceMappingURL=is-not-in.js.map