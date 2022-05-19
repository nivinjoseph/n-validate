"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hasMaxLength = void 0;
const base_string_validation_rule_1 = require("./base-string-validation-rule");
const n_defensive_1 = require("@nivinjoseph/n-defensive");
// public
function hasMaxLength(maxLength) {
    return new StringHasMaxLength(maxLength);
}
exports.hasMaxLength = hasMaxLength;
class StringHasMaxLength extends base_string_validation_rule_1.BaseStringValidationRule {
    constructor(maxLength) {
        (0, n_defensive_1.given)(maxLength, "maxLength").ensureHasValue();
        super();
        this.addValidationRule({
            // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
            validate: t => t == null || t.trim().length <= maxLength,
            error: `Max length of ${maxLength} required`
        });
    }
}
//# sourceMappingURL=has-max-length.js.map