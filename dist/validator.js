"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var n_defensive_1 = require("n-defensive");
require("n-ext");
var internal_property_validator_1 = require("./internal-property-validator");
// public
var Validator = (function () {
    function Validator() {
        this._propertyValidators = new Array();
        this._hasErrors = false;
        this._errors = {};
    }
    Object.defineProperty(Validator.prototype, "isValid", {
        get: function () { return !this._hasErrors; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Validator.prototype, "hasErrors", {
        get: function () { return this._hasErrors; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Validator.prototype, "errors", {
        get: function () { return this._errors; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Validator.prototype, "hasRules", {
        get: function () { return this._propertyValidators.length > 0; },
        enumerable: true,
        configurable: true
    });
    Validator.prototype.for = function (propertyName) {
        var _this = this;
        n_defensive_1.given(propertyName, "propertyName")
            .ensureHasValue()
            .ensure(function (t) { return !t.isEmptyOrWhiteSpace(); })
            .ensure(function (t) { return _this._propertyValidators.every(function (u) { return u.propertyName !== t; }); }, "validation already defined for property '{0}'".format(propertyName));
        var propertyValidator = new internal_property_validator_1.InternalPropertyValidator(propertyName);
        this._propertyValidators.push(propertyValidator);
        return propertyValidator;
    };
    Validator.prototype.validate = function (value) {
        var _this = this;
        this._hasErrors = false;
        this._errors = {};
        n_defensive_1.given(value, "value")
            .ensureHasValue();
        this._propertyValidators.forEach(function (t) {
            t.validate(value);
            if (t.hasError) {
                _this._hasErrors = true;
                _this._errors[t.propertyName] = t.error;
            }
        });
    };
    return Validator;
}());
exports.Validator = Validator;
//# sourceMappingURL=validator.js.map