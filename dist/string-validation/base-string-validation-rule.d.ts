import { BaseValidationRule } from "./../base-validation-rule";
export declare abstract class BaseStringValidationRule extends BaseValidationRule<string> {
    protected constructor();
    protected isNumber(value: any): boolean;
}
