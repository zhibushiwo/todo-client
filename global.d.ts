type Many<T> = T | readonly T[];
type PropertyName = string | number | symbol;
declare type TKeyPath = Many<PropertyName>;
