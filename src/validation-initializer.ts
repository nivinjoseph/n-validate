import { PropertyValidator } from "./property-validator";

// public
export interface ValidationInitializer<T>
{
    for<TProperty>(propertyName: string): PropertyValidator<T, TProperty>;
}