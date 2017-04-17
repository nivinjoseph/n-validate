"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var base_number_validation_rule_1 = require("./base-number-validation-rule");
exports.BaseNumberValidationRule = base_number_validation_rule_1.BaseNumberValidationRule;
var has_min_value_1 = require("./has-min-value");
var has_max_value_1 = require("./has-max-value");
var is_in_1 = require("./is-in");
var is_not_in_1 = require("./is-not-in");
var numval = { hasMinValue: has_min_value_1.hasMinValue, hasMaxValue: has_max_value_1.hasMaxValue, isIn: is_in_1.isIn, isNotIn: is_not_in_1.isNotIn };
exports.numval = numval;
//# sourceMappingURL=index.js.map