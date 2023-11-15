import type {specification} from '@openapi-adapter/core'
import { Type } from "../codegen/Type";



export function schemaToType(
  schema: specification.SchemaObject
): Type<any> {
  if (!!schema.$ref) {
    let parts = schema.$ref.split("/")
    return Type.newRef(parts[parts.length-1])
  }

  let t: Type<any>

  if (!!schema.enum) {
    t = Type.newUnion(
      ...schema.enum.map(e => Type.newString())
    )
  } else if (schema.type === 'string') {
    t = Type.newString()
  } else if (schema.type === 'integer'||schema.type === 'number') {
    t =Type.newNumber()
  } else if (schema.type === 'boolean') {
    t =Type.newBoolean()
  } else if (schema.type === 'null') {
    t = Type.newNull()
  } else if (schema.type === 'array') {
    if (!schema.items) {
      throw `schema with type:array does not have 'items' specified`
    }
    t = Type.newArray(schemaToType(schema.items))
  } else if (schema.type === 'object'){

    let properties: Type<'object'>|undefined = undefined
    if (!!schema.properties) {
      let fields: Record<string,Type<any>> = {}
      Object.entries(schema.properties).forEach(([fieldId,field])=>{
        fields[fieldId] = schemaToType(field)
      }) 
      properties = Type.newObject(fields)
    }
    
    let additionalProperties: Type<any>|undefined 
    if (schema.additionalProperties === true) {
      additionalProperties = Type.newMap(Type.newString(),Type.newAny())
    } else if (schema.additionalProperties) {
      additionalProperties = Type.newMap(Type.newString(),schemaToType(schema.additionalProperties))
    }

    if (!properties  && !additionalProperties ){
      t = Type.newMap(Type.newAny(),Type.newAny())
    } else {
      t = Type.newIntersection(properties,additionalProperties)  
    }
  } else if (!!schema.anyOf) {
    t = Type.newRef("Partial", Type.newIntersection(...schema.anyOf.map(t => schemaToType(t))))
  } else if (!!schema.allOf) {
    t = Type.newIntersection(...schema.allOf.map(t => schemaToType(t)))
  } else if (!!schema.oneOf) {
    t = Type.newUnion(...schema.oneOf.map(t => schemaToType(t)))
  } else {
    throw `unspecified type in schema`
  }

  if (schema.not) {
    return Type.newRef("import('@openapi-adapter/core').utility.Not",t,schemaToType(schema.not))
  } else {
    return t
  }
}