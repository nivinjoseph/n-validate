import { BaseValidationRule } from "./../base-validation-rule";

// public
export abstract class BaseStringValidationRule extends BaseValidationRule<string>
{
    protected constructor()
    {
        super();
        this.addValidationRule(
            {
                validate: t => typeof t === "string",
                error: "Invalid value"
            });
    }

    protected isNumber(value: any): boolean
    {
        value = value.toString().trim();
        if (value.length === 0)
            return false;
        let parsed = +value.toString().trim();
        return !isNaN(parsed) && isFinite(parsed);
    }
}