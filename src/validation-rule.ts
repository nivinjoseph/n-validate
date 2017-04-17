// public
export interface ValidationRule<T>
{
    error: any;
    validate(value: T): boolean;
}