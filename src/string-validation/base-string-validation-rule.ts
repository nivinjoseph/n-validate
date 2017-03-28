import BaseValidationRule from "./../base-validation-rule";

// public
abstract class BaseStringValidationRule extends BaseValidationRule<string>
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
        let parsed = +value.toString().trim();
        return !isNaN(parsed) && isFinite(parsed);
    }
}

export default BaseStringValidationRule;