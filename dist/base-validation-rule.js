// public
export class BaseValidationRule {
    constructor() {
        this._validationRules = new Array();
        this._error = null;
    }
    get error() { return this._error; }
    validate(value) {
        this._error = null;
        for (let i = 0; i < this._validationRules.length; i++) {
            if (this._validationRules[i].validate(value))
                continue;
            this._error = this._validationRules[i].error;
            return false;
        }
        return true;
    }
    addValidationRule(validationRule) {
        this._validationRules.push(validationRule);
    }
}
//# sourceMappingURL=base-validation-rule.js.map