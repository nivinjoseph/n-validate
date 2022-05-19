"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isIn = void 0;
const base_number_validation_rule_1 = require("./base-number-validation-rule");
const n_defensive_1 = require("@nivinjoseph/n-defensive");
// public
function isIn(values) {
    return new NumberIsIn(values);
}
exports.isIn = isIn;
class NumberIsIn extends base_number_validation_rule_1.BaseNumberValidationRule {
    constructor(values) {
        (0, n_defensive_1.given)(values, "values").ensureHasValue();
        super();
        this.addValidationRule({
            // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
            validate: t => t == null || values.some(u => u === t),
            error: "Invalid value"
        });
    }
}
//# sourceMappingURL=is-in.js.map