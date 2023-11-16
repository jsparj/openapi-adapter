import { codegen } from "../types";


export namespace Type {
  export type Kind = 
    | Universal['kind']
    | Complex['kind']

  export type Value<T extends Kind> = (Universal|Complex) & {kind: T}

  export type Universal = 
    | Any
    | Undefined
    | Null
    | Never
    | Unknown

  export type Complex = 
    | Array
    | Map
    | Boolean
    | Intersection 
    | Number
    | Object
    | Ref
    | String
    | Tuple
    | Union


  export type Any = {
    kind: 'any'
  }

  export type Undefined = {
    kind: 'undefined'
  }

  export type Null = {
    kind: 'null'
  }

  export type Unknown = {
    kind: 'unknown'
  }

  export type Never = {
    kind: 'never'
  }

  export type Object = {
    kind: 'object'
    fields: Record<string,{type: Type<any>, comments: string[]}>
  }

  export type Array = {
    kind: 'array'
    items: Type<any>
  }

  export type Boolean = {
    kind: 'boolean'
    literal?: boolean
  }

  export type String = {
    kind: 'string'
    literal?: string
  }

  export type Number = {
    kind: 'number'
    literal?: number
  }

  export type Ref = {
    kind: 'ref'
    literal: string
    generics: Type<any>[]
  }

  export type Map = {
    kind: 'map'
    keys: Type<any>
    values: Type<any>
  }

  export type Union = {
    kind: 'union'
    types: Type<any>[]
  }

  export type Intersection = {
    kind: 'intersection'
    types: Type<any>[]
  }

  export type Tuple = {
    kind: 'tuple'
    types: Type<any>[]
  }
}  


export class Type<T extends Type.Kind> implements codegen.IObject<'type'>{
  readonly type: 'type' = 'type'
  readonly value: Type.Universal | Type.Complex


  get id(): string {
    return `${this.type}:${this.value.kind}`
  }

  private constructor(value: Type.Value<T>) {
    this.value = value
  }

  static newAny(): Type<'any'> {
    return new Type({
      kind:'any',
    })
  }

  static newUndefined(): Type<'undefined'> {
    return new Type({
      kind:'undefined',
    })
  }

  static newNull(): Type<'null'> {
    return new Type({
      kind:'null',
    })
  }
  static newNever(): Type<'never'> {
    return new Type({
      kind:'never',
    })
  }


  static newUnknown(): Type<'unknown'> {
    return new Type({
      kind:'unknown',
    })
  }

  static newArray(items: Type<any>): Type<'array'> {
    return new Type<'array'>({
      kind: 'array',
      items: items
    })
  }

  static newBoolean(literal: boolean|undefined = undefined): Type<'boolean'> {
    return new Type({
      kind: 'boolean',
      literal: literal
    })
  }

  static newString(literal: string|undefined = undefined): Type<'string'> {
    return new Type({
      kind: 'string',
      literal: literal
    })
  }

  static newNumber(literal: number|undefined = undefined): Type<'number'> {
    return new Type({
      kind: 'number',
      literal: literal
    })
  }

  static newIntersection(...types: (Type<any>|undefined)[]): Type<'intersection'> {
    return new Type({
      kind: 'intersection',
      types: types.filter(t => !!t) as Type<any>[]
    })
  }

  static newUnion(...types: (Type<any>|undefined)[]): Type<'union'> {
    return new Type({
      kind: 'union',
      types: types.filter(t => !!t) as Type<any>[]
    })
  }

  static newTuple(...types:(Type<any>|undefined)[]): Type<'tuple'> {
    return new Type({
      kind: 'tuple',
      types: types.filter(t => !!t) as Type<any>[]
    })
  }
  
  static newRef(literal: string, ...generics: Type<any>[]): Type<'ref'> {
    return new Type({
      kind: 'ref',
      literal: literal,
      generics: generics
    })
  }
  
  static newObject(fields: Record<string,{type: Type<any>, comments: string[]}>): Type<'object'> {
    return new Type({
      kind: 'object',
      fields,
    })
  }

  static newMap(keys: Type<any>, values: Type<any>): Type<'map'> {
    return new Type({
      kind: 'map',
      keys,
      values,
    })
  }

  /**
   * This method is only for object types.
   */
  tryAddField(fieldId: string, type: Type<any>, ...comments: string[]): boolean {
    if (this.value.kind !== 'object') {
      throw `type is not an object`
    }

    let changed = false
    if (!this.value.fields[fieldId]) {
      this.value.fields[fieldId] = {
        type,
        comments
      }
    }

    return changed
  }


  toString(...indents: string[]): string {
    const indent = indents.join("")
    let v = this.value
    
    switch(v.kind) {
      case "null":
      case "undefined":
      case "never":
      case "any":
      case "unknown":
        return v.kind

      case "boolean":
        if (v.literal !== undefined) return v.literal?"true":"false"
        return "boolean"

      case "number":
        if (v.literal !== undefined) return `${v.literal}`
        return "number"

      case "string":
        if (!!v.literal) return `"${v.literal}"`
        return "string"

      case "array":
        return `${v.items.toString(indent)}[]`

      case "intersection":
        if (v.types.length == 0) return 'never'
        if (v.types.length == 1) return v.types[0].toString(indent)
        return `(${v.types.map(t => t.toString(indent)).join("&")})`
      
      case "union":
        if (v.types.length == 0) return 'never'
        if (v.types.length == 1) return v.types[0].toString(indent)
        return `(${v.types.map(t => t.toString(indent)).join("|")})`

      case "tuple":
        return `[${v.types.map(t => t.toString(indent)).join(",")}]`

      case "ref":
        return v.literal + (v.generics.length>0?`<${v.generics.map(t => t.toString(indent)).join(",")}>`:"")

      case 'map':
        return `Record<${v.keys.toString(indent)},${v.values.toString(indent)}>`

      case "object":
        let content = "{\n"
        
        Object.entries(v.fields).forEach(([key,value])=>{
          if (value.comments.length>0) {
            content += `${indent}\t/**\n` 
            value.comments.forEach(comment => {
              content += `${indent}\t * ${comment}\n`
            })
            content += `${indent}\t */\n` 
          }
          content += `${indent}\t${key}: ${value.type.toString(indent,"\t")}\n` 
        })
        content += indent+ "}"
        return content
    }
  }
}