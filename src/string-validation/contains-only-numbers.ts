import { ValidationRule } from "./../validation-rule.js";
import { BaseStringValidationRule } from "./base-string-validation-rule.js";

// public
export function containsOnlyNumbers(): ValidationRule<string>
{
    return new StringContainsOnlyNumbers();
}

class StringContainsOnlyNumbers extends BaseStringValidationRule
{
    public constructor()
    {
        super();
        this.addValidationRule(
            {
                // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
                validate: t => t == null || this.isNumber(t),
                error: "Invalid value"
            });
    }
}