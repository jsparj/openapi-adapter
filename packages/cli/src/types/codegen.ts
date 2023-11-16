export namespace codegen {
  export interface IObject<T extends string>{
    type: T
    id: string
    toString(... indents: string[]): string
  }
}