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

    protected isNumber(value: unknown): boolean
    {
        const val = (<object>value).toString().trim();
        if (val.length === 0)
            return false;
        const parsed = +val;
        return !isNaN(parsed) && isFinite(parsed);
    }
}