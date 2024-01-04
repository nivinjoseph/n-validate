import { given } from "@nivinjoseph/n-defensive";
import { ValidationRule } from "./../validation-rule.js";
import { BaseNumberValidationRule } from "./base-number-validation-rule.js";

// public
export function isNotIn(values: ReadonlyArray<number>): ValidationRule<number>
{
    return new NumberIsNotIn(values);
}

class NumberIsNotIn extends BaseNumberValidationRule
{
    public constructor(values: ReadonlyArray<number>)
    {
        given(values, "values").ensureHasValue();
        super();
        this.addValidationRule({
            // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
            validate: t => t == null || values.every(u => u !== t),
            error: "Invalid value"
        });
    }
}