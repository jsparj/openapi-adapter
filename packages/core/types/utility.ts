export namespace utility {
    export type Primitive = string | number | boolean | null;
    export type DigitString = "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9";
    export type Intersect<U> = (U extends any ? (k: U) => void : never) extends (k: infer I) => void ? I : never
    export type StringLength<S extends string, Acc extends 0[] = []> = S extends `${string}${infer $Rest}` ? StringLength<$Rest, [...Acc, 0]> : Acc["length"];
    export type RemoveIndex<T> = { [K in keyof T as {} extends Record<K, 1> ? never : K]: T[K] };
    export type RequiredChild<T extends object, U extends keyof T> = Exclude<T[U], undefined>;
    export type DeepPartial<T> = T extends Function ? T : T extends object ? { [key in keyof T]?: DeepPartial<T[key]> } : T
    export type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
    export type PickKeysThat<T extends object, U> = { [K in keyof T]-?: U extends T[K] ? K : never; }[keyof T];
    export type OmitValues<T extends object, U> = Omit<T, PickKeysThat<T, U>>
    export type PickValues<T extends object, U> = Pick<T, PickKeysThat<T, U>>
    export type UnionToTuple<T, R extends any[] = [], U = T> = U extends infer A ? Exclude<T, A> extends never ? [T, ...R] : UnionToTuple<Exclude<T, A>, [A, ...R]> : R 
    export type IsUnion<T, True = true, False = false> = T extends unknown ? ([T] extends [T] ? False : True) : never;
    export type Not<T,Not> = T extends Not ? never:T
}