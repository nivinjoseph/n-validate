"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var base_validation_rule_1 = require("./base-validation-rule");
require("n-ext");
var n_defensive_1 = require("n-defensive");
function hasMinValue(minValue) {
    return new NumberHasMinValue(minValue);
}
exports.hasMinValue = hasMinValue;
function hasMaxValue(maxValue) {
    return new NumberHasMaxValue(maxValue);
}
exports.hasMaxValue = hasMaxValue;
function isIn(values) {
    return new NumberIsIn(values);
}
exports.isIn = isIn;
function isNotIn(values) {
    return new NumberIsNotIn(values);
}
exports.isNotIn = isNotIn;
var BaseNumberValidationRule = (function (_super) {
    __extends(BaseNumberValidationRule, _super);
    function BaseNumberValidationRule() {
        var _this = _super.call(this) || this;
        _this.addValidationRule({
            validate: function (t) { return typeof t === "number"; },
            error: "Invalid value"
        });
        return _this;
    }
    return BaseNumberValidationRule;
}(base_validation_rule_1.default));
var NumberHasMinValue = (function (_super) {
    __extends(NumberHasMinValue, _super);
    function NumberHasMinValue(minValue) {
        var _this = this;
        n_defensive_1.default(minValue, "minValue").ensureHasValue();
        _this = _super.call(this) || this;
        _this.addValidationRule({
            validate: function (t) { return t == null || t >= minValue; },
            error: "Value cannot be less than {0}".format(minValue)
        });
        return _this;
    }
    return NumberHasMinValue;
}(BaseNumberValidationRule));
var NumberHasMaxValue = (function (_super) {
    __extends(NumberHasMaxValue, _super);
    function NumberHasMaxValue(maxValue) {
        var _this = this;
        n_defensive_1.default(maxValue, "maxValue").ensureHasValue();
        _this = _super.call(this) || this;
        _this.addValidationRule({
            validate: function (t) { return t == null || t <= maxValue; },
            error: "Value cannot be greater than {0}".format(maxValue)
        });
        return _this;
    }
    return NumberHasMaxValue;
}(BaseNumberValidationRule));
var NumberIsIn = (function (_super) {
    __extends(NumberIsIn, _super);
    function NumberIsIn(values) {
        var _this = this;
        n_defensive_1.default(values, "values").ensureHasValue();
        _this = _super.call(this) || this;
        _this.addValidationRule({
            validate: function (t) { return t == null || values.some(function (u) { return u === t; }); },
            error: "Invalid value"
        });
        return _this;
    }
    return NumberIsIn;
}(BaseNumberValidationRule));
var NumberIsNotIn = (function (_super) {
    __extends(NumberIsNotIn, _super);
    function NumberIsNotIn(values) {
        var _this = this;
        n_defensive_1.default(values, "values").ensureHasValue();
        _this = _super.call(this) || this;
        _this.addValidationRule({
            validate: function (t) { return t == null || values.every(function (u) { return u === t; }); },
            error: "Invalid value"
        });
        return _this;
    }
    return NumberIsNotIn;
}(BaseNumberValidationRule));
//# sourceMappingURL=number-validation.js.map