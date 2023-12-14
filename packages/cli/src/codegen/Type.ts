import { codegen } from "../types";
import { toShorthandPropertyKey } from "../utils/toShorthandPropertyKey";


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
    fields: Record<string,Type<any>>
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

  export type Metadata = {
    optional: boolean
    comments: string[]
  }
}  


export class Type<T extends Type.Kind> implements codegen.IObject<'type'>{
  readonly type: 'type' = 'type'
  readonly value: Type.Universal | Type.Complex
  readonly metadata: Type.Metadata

  get id(): string {
    return `${this.type}:${this.value.kind}`
  }

  private constructor(value: Type.Value<T>, metadata?: Type.Metadata) {
    this.value = value
    this.metadata = {
      optional: false,
      comments: [],
      ...metadata,
    }
  }

  static newAny(metadata?: Type.Metadata): Type<'any'> {
    return new Type({
      kind:'any',
    },metadata)
  }

  static newUndefined(metadata?: Type.Metadata): Type<'undefined'> {
    return new Type({
      kind:'undefined',
    },metadata)
  }

  static newNull( metadata?: Type.Metadata): Type<'null'> {
    return new Type({
      kind:'null',
    },metadata)
  }
  static newNever(metadata?: Type.Metadata): Type<'never'> {
    return new Type({
      kind:'never',
    },metadata)
  }


  static newUnknown(metadata?: Type.Metadata): Type<'unknown'> {
    return new Type({
      kind:'unknown',
    },metadata)
  }

  static newArray(items: Type<any>, metadata?: Type.Metadata): Type<'array'> {
    return new Type<'array'>({
      kind: 'array',
      items: items
    },metadata)
  }

  static newBoolean(literal?: boolean, metadata?: Type.Metadata): Type<'boolean'> {
    return new Type({
      kind: 'boolean',
      literal: literal
    },metadata)
  }

  static newString(literal?: string, metadata?: Type.Metadata): Type<'string'> {
    return new Type({
      kind: 'string',
      literal: literal
    },metadata)
  }

  static newNumber(literal?: number, metadata?: Type.Metadata): Type<'number'> {
    return new Type({
      kind: 'number',
      literal: literal
    },metadata)
  }

  static newIntersection(types: (Type<any>|undefined)[], metadata?: Type.Metadata): Type<'intersection'> {
    return new Type({
      kind: 'intersection',
      types: types.filter(t => !!t) as Type<any>[]
    },metadata)
  }

  static newUnion(types: (Type<any>|undefined)[], metadata?: Type.Metadata): Type<'union'> {
    return new Type({
      kind: 'union',
      types: types.filter(t => !!t) as Type<any>[]
    },metadata)
  }

  static newTuple(types:(Type<any>|undefined)[], metadata?: Type.Metadata): Type<'tuple'> {
    return new Type({
      kind: 'tuple',
      types: types.filter(t => !!t) as Type<any>[]
    },metadata)
  }
  
  static newRef(literal: string, generics: Type<any>[], metadata?: Type.Metadata): Type<'ref'> {
    return new Type({
      kind: 'ref',
      literal: literal,
      generics: generics
    },metadata)
  }
  
  static newObject(fields: Record<string,Type<any>>, metadata?: Type.Metadata): Type<'object'> {
    return new Type({
      kind: 'object',
      fields,
    },metadata)
  }

  static newMap(keys: Type<any>, values: Type<any>, metadata?: Type.Metadata): Type<'map'> {
    return new Type({
      kind: 'map',
      keys,
      values,
    },metadata)
  }

  /**
   * This method is only for object types.
   */
  tryAddField(fieldId: string, type: Type<any>): boolean {
    if (this.value.kind !== 'object') {
      throw `type is not an object`
    }

    let changed = false
    if (!this.value.fields[fieldId]) {
      this.value.fields[fieldId] = type
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
        if (!!v.literal) return `\`${v.literal}\``
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
          key = toShorthandPropertyKey(key)
          if (value.metadata.comments && value.metadata.comments.length>0) {
            content += `${indent}\t/**\n` 
            value.metadata.comments.forEach(comment => {
              content += `${indent}\t * ${comment}\n`
            })
            content += `${indent}\t */\n` 
          }

          const optional = value.metadata.optional?"?":""
          content += `${indent}\t${key}${optional}: ${value.toString(indent,"\t")}\n` 
        })
        content += indent+ "}"
        return content
    }
  }
}