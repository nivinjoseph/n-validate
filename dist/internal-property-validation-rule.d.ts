import { ValidationRule } from "./validation-rule.js";
import { Validator } from "./validator.js";
export declare class InternalPropertyValidationRule<T, TProperty> {
    private _tpropertyValidationPredicate;
    private _tValidationPredicate;
    private _validationRule;
    private _validator;
    private _conditionPredicate;
    private _error;
    private _overrideError;
    get error(): Object;
    get overrideError(): boolean;
    ensure(tpropertyValidationPredicate: (propertyValue: TProperty) => boolean): void;
    ensureT(tValidationPredicate: (value: T) => boolean): void;
    useValidationRule(validationRule: ValidationRule<TProperty>): void;
    useValidator(validator: Validator<TProperty>): void;
    if(conditionPredicate: (value: T) => boolean): void;
    withMessage(errorMessage: string | Function, overrideError?: boolean): void;
    validate(value: T, propertyValue: TProperty): boolean;
}
//# sourceMappingURL=internal-property-validation-rule.d.ts.map