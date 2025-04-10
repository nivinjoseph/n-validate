import { ValidationRule } from "./validation-rule.js";

/**
 * Abstract base class for creating validation rules.
 * Provides common functionality for validation rules including error handling and rule composition.
 * @template T - The type of value being validated
 */
export abstract class BaseValidationRule<T> implements ValidationRule<T>
{
    private readonly _validationRules = new Array<ValidationRule<T>>();
    private _error: string | null = null;

    /**
     * Gets the error message when validation fails.
     * @returns The error message or null if validation passed
     */
    public get error(): any { return this._error; }

    /**
     * Validates the given value against all registered validation rules.
     * @param value - The value to validate
     * @returns true if all validation rules pass, false otherwise
     */
    public validate(value: T): boolean
    {
        this._error = null;
        for (let i = 0; i < this._validationRules.length; i++)
        {
            if (this._validationRules[i].validate(value))
                continue;
            this._error = this._validationRules[i].error;
            return false;
        }
        return true;
    }

    /**
     * Adds a validation rule to be checked during validation.
     * @param validationRule - The validation rule to add
     */
    protected addValidationRule(validationRule: ValidationRule<T>): void
    {
        this._validationRules.push(validationRule);
    }
}