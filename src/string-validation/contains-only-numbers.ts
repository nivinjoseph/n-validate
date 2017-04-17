import { ValidationRule } from "./../validation-rule";
import { BaseStringValidationRule } from "./base-string-validation-rule";

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
                validate: t => t == null || this.isNumber(t),
                error: "Invalid value"
            });
    }
}