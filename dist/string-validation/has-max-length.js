"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const base_string_validation_rule_1 = require("./base-string-validation-rule");
const n_defensive_1 = require("@nivinjoseph/n-defensive");
require("@nivinjoseph/n-ext");
function hasMaxLength(maxLength) {
    return new StringHasMaxLength(maxLength);
}
exports.hasMaxLength = hasMaxLength;
class StringHasMaxLength extends base_string_validation_rule_1.BaseStringValidationRule {
    constructor(maxLength) {
        n_defensive_1.given(maxLength, "maxLength").ensureHasValue();
        super();
        this.addValidationRule({
            validate: t => t == null || t.trim().length <= maxLength,
            error: "Max length of {0} required".format(maxLength)
        });
    }
}
//# sourceMappingURL=has-max-length.js.map