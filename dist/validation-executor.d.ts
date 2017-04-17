export interface ValidationExecutor<T> {
    isValid: boolean;
    hasErrors: boolean;
    errors: Object;
    hasRules: boolean;
    validate(value: T): void;
}
