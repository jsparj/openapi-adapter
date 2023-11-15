export namespace codegen {

  export interface IObject<T extends string>{
    type: T
    id: string
    toString(... indents: string[]): string
  }

  export type Import = {
  
  }

  export type Namespace = {
    type: "namespace"
    export?: true
    objects: (
      | Namespace 
      | Interface 
      | TypeVarialbe 
      | Class 
      | Function
    )[]
  }

  export type Interface = {
    type: "interface"
    export?: true
    objects: Record<string,Type|InterfaceMethod>
  }

  export type InterfaceMethod = {
    type: "interface-method"
    parameters?: Type[]
    returns?: Type
  }

  export type TypeVarialbe = {
    type: "type-variable"
    export?: true
    name: string 
  }

  export type Class = {
    type: "class"
    export?: true | "default"
    name: string 
  }

  export type Function = {
    type: "function"
    export?: true | "default"
    name: string 
  }

  export type Type = {
    type: "type"
    
  }
}