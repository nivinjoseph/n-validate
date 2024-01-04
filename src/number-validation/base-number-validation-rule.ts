import { BaseValidationRule } from "./../base-validation-rule.js";

// public
export abstract class BaseNumberValidationRule extends BaseValidationRule<number>
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