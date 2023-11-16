import type {specification} from '@openapi-adapter/core'
import { Type } from "../codegen/Type";


export function schemaToTypeAndComments(
  schema: specification.SchemaObject
): {
  type: Type<any> 
  comments: string[]
}{
  if (!!schema.$ref) {
    let parts = schema.$ref.split("/")
    return {
     type: Type.newRef(parts[parts.length-1]),
     comments: []
    }
  }

  let comments: string[] = []

  if (schema.deprecated) {
    comments = comments.concat(`@deprecated`)
  }

  if (schema.title) {
    comments = comments.concat(
      "@title "+ schema.title?.split('\n').map(line => `\t${line}`)??[]
    )
  }

  if (schema.summary) {
    comments = comments.concat(
      "@summary "+ schema.summary?.split('\n').map(line => `\t${line}`)??[]
    )
  }

  if (schema.description) {
    comments = comments.concat(
      "@description "+ schema.description?.split('\n').map(line => `\t${line}`)??[]
    )
  }

  
  let t: Type<any>
  let definition: string[] = []
  

  if (!!schema.enum) {
    t = Type.newUnion(
      ...schema.enum.map(e => Type.newString())
    )
  } else if (schema.type === 'string') {
    if (schema.pattern !== undefined) {
      definition = definition.concat(`- \`pattern\`: ${schema.pattern.replace('\n',"\\n")}`)
    } 
    if (schema.minLength !== undefined) {
      definition = definition.concat(`- \`minLength\`: ${schema.minLength}`)
    }
    if (schema.maxLength !== undefined) {
      definition = definition.concat(`- \`maxLength\`: ${schema.maxLength}`)
    }
    t = Type.newString()
  } else if (schema.type === 'integer'||schema.type === 'number') {
    if (schema.exclusiveMinimum) {
      definition = definition.concat(`- \`exclusiveMinimum\`: ${schema.exclusiveMinimum}`)
    }
    if (schema.minimum) {
      definition = definition.concat(`- \`minimum\`: ${schema.minimum}`)
    }
    if (schema.exclusiveMaximum) {
      definition = definition.concat(`- \`exclusiveMaximum\`: ${schema.exclusiveMaximum}`)
    }
    if (schema.maximum) {
      definition = definition.concat(`- \`maximum\`: ${schema.maximum}`)
    }
    if (schema.multipleOf) {
      definition = definition.concat(`- \`multipleOf\`: ${schema.multipleOf}`)
    }
    t =Type.newNumber()
  } else if (schema.type === 'boolean') {
    t =Type.newBoolean()
  } else if (schema.type === 'null') {
    t = Type.newNull()
  } else if (schema.type === 'array') {
    if (!schema.items) {
      throw `schema with type:array does not have 'items' specified`
    }
    if (schema.uniqueItems) {
      definition = definition.concat(`- \`uniqueItems\`: true`)
    }
    if (schema.minItems) {
      definition = definition.concat(`- \`minItems\`: ${schema.minItems}`)
    }
    if (schema.maxItems) {
      definition = definition.concat(`- \`maxItems\`: ${schema.maxItems}`)
    }
    t = Type.newArray(schemaToTypeAndComments(schema.items).type)
  } else if (schema.type === 'object'){
    if (schema.minProperties) {
      definition = definition.concat(`- \`minProperties\`: ${schema.minProperties}`)
    }
    if (schema.maxProperties) {
      definition = definition.concat(`- \`maxProperties\`: ${schema.maxProperties}`)
    }

    let properties: Type<'object'>|undefined = undefined
    if (!!schema.properties) {
      let fields: Record<string,{type: Type<any>, comments: string[]}> = {}
      Object.entries(schema.properties).forEach(([fieldId,field])=>{
        fields[fieldId] = schemaToTypeAndComments(field)
      }) 
      properties = Type.newObject(fields)
    }
    
    let additionalProperties: Type<any>|undefined 
    if (schema.additionalProperties === true) {
      additionalProperties = Type.newMap(Type.newString(),Type.newAny())
    } else if (schema.additionalProperties) {
      additionalProperties = Type.newMap(Type.newString(),schemaToTypeAndComments(schema.additionalProperties).type)
    }

    if (!properties  && !additionalProperties ){
      t = Type.newMap(Type.newAny(),Type.newAny())
    } else {
      t = Type.newIntersection(properties,additionalProperties)  
    }
  } else if (!!schema.anyOf) {
    t = Type.newRef("Partial", Type.newIntersection(...schema.anyOf.map(t => schemaToTypeAndComments(t).type)))
  } else if (!!schema.allOf) {
    t = Type.newIntersection(...schema.allOf.map(t => schemaToTypeAndComments(t).type))
  } else if (!!schema.oneOf) {
    t = Type.newUnion(...schema.oneOf.map(t => schemaToTypeAndComments(t).type))
  } else {
    throw `unspecified type in schema`
  }

  if (schema.default) {
    let d = schema.default.split('\n')
    definition = definition.concat(`- \`default\`: ${d[0]}`)
    for (let i=1;i<d.length;i++) {
      definition = definition.concat(`\t\t${d[i]}`)
    }
  }

  if (schema.format) {
    let f = schema.format.split('\n')
    definition = definition.concat(`- \`format\`: ${f[0]}`)
    for (let i=1;i<f.length;i++) {
      definition = definition.concat(`\t\t${f[i]}`)
    }
  }

  if (definition.length > 0) {
    comments = comments.concat("@definition The schema has following definitions:", definition)
  }
  
  if (schema.not) {
    return {
     type: Type.newRef("import('@openapi-adapter/core').utility.Not",t,schemaToTypeAndComments(schema.not).type),
     comments: comments
    }
  } else {
    return {
      type: t,
      comments: comments
    }
  }
}