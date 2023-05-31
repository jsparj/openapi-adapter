export type Digit = "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9";
export type Intersect<U> = (U extends any ? (k: U) => void : never) extends (k: infer I) => void ? I : never
export type StringLength<S extends string,Acc extends 0[] = []> = S extends `${string}${infer $Rest}`? StringLength<$Rest, [...Acc, 0]>: Acc["length"];
export type RemoveIndex<T> = {[K in keyof T as {} extends Record<K, 1> ? never : K]: T[K]};
export type RequiredChild<T extends object, U extends keyof T> = Exclude<T[U], undefined>;
export type DeepPartial<T> = T extends object ? { [P in keyof T]?: DeepPartial<T[P]> } : T;
export type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;