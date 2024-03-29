import { ValidationRule } from "./validation-rule.js";
export declare abstract class BaseValidationRule<T> implements ValidationRule<T> {
    private readonly _validationRules;
    private _error;
    get error(): any;
    validate(value: T): boolean;
    protected addValidationRule(validationRule: ValidationRule<T>): void;
}
//# sourceMappingURL=base-validation-rule.d.ts.map