import PropertyValidator from "./property-validator";

// public
interface ValidationInitializer<T>
{
    for<TProperty>(propertyName: string): PropertyValidator<T, TProperty>;
}

export default ValidationInitializer;