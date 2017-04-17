import { PropertyValidator } from "./property-validator";
export interface ValidationInitializer<T> {
    for<TProperty>(propertyName: string): PropertyValidator<T, TProperty>;
}
