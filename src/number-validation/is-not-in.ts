import { ValidationRule } from "./../validation-rule";
import { BaseNumberValidationRule } from "./base-number-validation-rule";
import { given } from "@nivinjoseph/n-defensive";

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