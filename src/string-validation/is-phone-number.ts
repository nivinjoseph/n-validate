import { ValidationRule } from "./../validation-rule.js";
import { BaseStringValidationRule } from "./base-string-validation-rule.js";

// public
export function isPhoneNumber(): ValidationRule<string>
{
    return new StringIsPhoneNumber();
}

class StringIsPhoneNumber extends BaseStringValidationRule
{
    public constructor()
    {
        super();
        this.addValidationRule(
            {
                // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
                validate: t => t == null || (this.isNumber(t) && t.trim().length === 10),
                error: "Invalid value"
            });
    }
}