import type {specification} from '@openapi-adapter/core'
import { Type, Import } from "../codegen";
import { refToTypename } from '../utils/refToTypename';


export function schemaToMetadata(
  schema: specification.SchemaObject
): {
  type: Type<any> 
  comments: string[]
  imports: Import[]
}{
  if (!!schema.$ref) {
    let typeName = refToTypename(schema.$ref)
    return {
     type: Type.newRef("schema."+typeName),
     comments: [],
     imports: [new Import('./schemas',{schema:null},undefined,true)]
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
    t = Type.newTuple(
      ...schema.enum.map(e => Type.newString(e))
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
    t = Type.newArray(schemaToMetadata(schema.items).type)
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
        let opt = schema.required?.includes(fieldId)? "": "?" 
        fields[fieldId+opt] = schemaToMetadata(field)
      }) 
      properties = Type.newObject(fields)
    }
    
    let additionalProperties: Type<any>|undefined 
    if (schema.additionalProperties === true) {
      additionalProperties = Type.newMap(Type.newString(),Type.newAny())
    } else if (schema.additionalProperties) {
      additionalProperties = Type.newMap(Type.newString(),schemaToMetadata(schema.additionalProperties).type)
    }

    if (!properties  && !additionalProperties ){
      t = Type.newMap(Type.newAny(),Type.newAny())
    } else {
      t = Type.newIntersection(properties,additionalProperties)  
    }
  } else if (!!schema.anyOf) {
    t = Type.newRef("Partial", Type.newIntersection(...schema.anyOf.map(t => schemaToMetadata(t).type)))
  } else if (!!schema.allOf) {
    t = Type.newIntersection(...schema.allOf.map(t => schemaToMetadata(t).type))
  } else if (!!schema.oneOf) {
    t = Type.newUnion(...schema.oneOf.map(t => schemaToMetadata(t).type))
  } else {
    console.warn('warning: could not parse schema, treating following schema as unknown:',schema)
    t = Type.newUnknown()
  }

  if (schema.default) {
    definition = definition.concat(`- \`default\`: ${JSON.stringify(schema.default)}`)
  }

  if (schema.format) {
    definition = definition.concat(`- \`format\`: ${JSON.stringify(schema.format)}`)
  }

  if (definition.length > 0) {
    comments = comments.concat("@definition The schema has following definitions:", definition)
  }
  
  if (schema.not) {
    return {
     type: Type.newRef("utility.Not",t,schemaToMetadata(schema.not).type),
     comments: comments,
     imports: [new Import('@openapi-adapter/core',{utility:null})]
    }
  } else {
    return {
      type: t,
      comments: comments,
      imports: []
    }
  }
}