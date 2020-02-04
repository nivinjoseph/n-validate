"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const base_string_validation_rule_1 = require("./base-string-validation-rule");
const n_defensive_1 = require("@nivinjoseph/n-defensive");
const moment = require("moment");
function isDate(format) {
    return new StringIsDate(format);
}
exports.isDate = isDate;
class StringIsDate extends base_string_validation_rule_1.BaseStringValidationRule {
    constructor(format) {
        n_defensive_1.given(format, "format").ensureHasValue().ensureIsString();
        super();
        this.addValidationRule({
            validate: t => t == null || moment(t, format).isValid(),
            error: "Invalid date"
        });
    }
}
//# sourceMappingURL=is-date.js.map