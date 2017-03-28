import BaseValidationRule from "./../base-validation-rule";

// public
abstract class BaseNumberValidationRule extends BaseValidationRule<number>
{
    public constructor()
    {
        super();
        this.addValidationRule(
            {
                validate: (t: number) => typeof t === "number",
                error: "Invalid value"
            });
    }
}

export default BaseNumberValidationRule;