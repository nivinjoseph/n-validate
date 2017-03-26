import PropertyValidator from "./property-validator";

interface ValidationInitializer<T>
{
    for<TProperty>(propertyName: string): PropertyValidator<T, TProperty>;
}

export default ValidationInitializer;