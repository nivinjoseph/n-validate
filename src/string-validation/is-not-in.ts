import { ValidationRule } from "./../validation-rule";
import { BaseStringValidationRule } from "./base-string-validation-rule";
import { given } from "@nivinjoseph/n-defensive";

// public
export function isNotIn(values: ReadonlyArray<string>): ValidationRule<string>;
export function isNotIn(values: ReadonlyArray<string>, ignoreCase: boolean): ValidationRule<string>;
export function isNotIn(values: ReadonlyArray<string>, ignoreCase?: boolean): ValidationRule<string>
{
    return new StringIsNotIn(values, !!ignoreCase);
}

class StringIsNotIn extends BaseStringValidationRule
{
    public constructor(values: ReadonlyArray<string>);
    public constructor(values: ReadonlyArray<string>, ignoreCase: boolean);
    public constructor(values: ReadonlyArray<string>, ignoreCase?: boolean)
    {
        given(values, "values").ensureHasValue();
        super();
        this.addValidationRule(
            {
                // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
                validate: t => t == null || (ignoreCase
                    ? values.every(v => v.trim().toLowerCase() !== t.trim().toLowerCase())
                    : values.every(v => v.trim() !== t.trim())),
                error: "Invalid value"
            });
    }
}