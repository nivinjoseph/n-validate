interface ValidationRule<T>
{
    error: any;
    validate(value: T): boolean;
}

export default ValidationRule;