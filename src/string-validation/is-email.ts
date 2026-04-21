import { ValidationRule } from "./../validation-rule.js";
import { BaseStringValidationRule } from "./base-string-validation-rule.js";

// public
export function isEmail(): ValidationRule<string>
{
    return new StringIsEmail();
}

class StringIsEmail extends BaseStringValidationRule
{
    public constructor()
    {
        super();
        this.addValidationRule(
            {
                validate: t =>
                {
                    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
                    return t == null || re.test(t.trim());
                },
                error: "Invalid value"
            });
    }
}