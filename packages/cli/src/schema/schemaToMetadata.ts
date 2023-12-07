import type {specification} from '@openapi-adapter/core'
import { Type, Import } from "../codegen";
import { refToTypename } from '../utils/refToTypename';


export function schemaToMetadata(
  schema: specification.SchemaObject
): {
  type: Type<any> 
  imports: Import[]
}{
  if (!!schema.$ref) {
    let typeName = refToTypename(schema.$ref)
    return {
     type: Type.newRef("schema."+typeName,[]),
     imports: [new Import('./schemas',{schema:null},undefined,true)]
    }
  }  

  let comments: string[] = []

  if (schema.deprecated) {
    comments = comments.concat(`@deprecated`)
  }

  if (schema.title) {
    comments = comments.concat(
      "@title "+ schema.title?.split('\n').map(line => `\t${line.replace('*/','*​/').replace('/*','/​*')}`)??[] //add zerowidth space so the document comment doesn't break
    )
  }

  if (schema.summary) {
    comments = comments.concat(
      "@summary "+ schema.summary?.split('\n').map(line => `\t${line.replace('*/','*​/').replace('/*','/​*')}`)??[] //add zerowidth space so the document comment doesn't break
    )
  }

  if (schema.description) {
    comments = comments.concat(
      "@description "+ schema.description?.split('\n').map(line => `\t${line.replace('*/','*​/').replace('/*','/​*')}`)??[] //add zerowidth space so the document comment doesn't break
    )
  }

  let imports: Import[] = []
  let t: Type<any>
  let definition: string[] = []
  

  if (schema.pattern !== undefined) {
    definition = definition.concat(`- \`pattern\`: ${schema.pattern.replace('\n',"\\n")}`)
  } 
  if (schema.minLength !== undefined) {
    definition = definition.concat(`- \`minLength\`: ${schema.minLength}`)
  }
  if (schema.maxLength !== undefined) {
    definition = definition.concat(`- \`maxLength\`: ${schema.maxLength}`)
  }

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

  if (schema.default) {
    definition = definition.concat(`- \`default\`: ${JSON.stringify(schema.default)}`)
  }

  if (schema.format) {
    definition = definition.concat(`- \`format\`: ${JSON.stringify(schema.format)}`)
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

  if (schema.minProperties) {
    definition = definition.concat(`- \`minProperties\`: ${schema.minProperties}`)
  }
  if (schema.maxProperties) {
    definition = definition.concat(`- \`maxProperties\`: ${schema.maxProperties}`)
  }

  if (definition.length > 0) {
    comments = comments.concat("@definition The schema has following definitions:", definition)
  }
  
  const metadata: Type.Metadata = {
    comments,
    optional: false 
  }

  if (!!schema.enum) {
    t = Type.newUnion([
      ...schema.enum.filter(e => typeof e === 'string').map(e => Type.newString(e)),
      ...schema.enum.filter(e => typeof e === 'boolean').map(e => Type.newBoolean(e)),
      ...schema.enum.filter(e => typeof e === 'number').map(e => Type.newNumber(e)),
      ...schema.enum.filter(e => e === null).map(e => Type.newNull()),
    ],metadata)
  } else if (schema.type === 'string') {
    t = Type.newString(undefined,metadata)
  } else if (schema.type === 'integer'||schema.type === 'number') {
    t =Type.newNumber(undefined,metadata)
  } else if (schema.type === 'boolean') {
    t =Type.newBoolean(undefined,metadata)
  } else if (schema.type === 'null') {
    t = Type.newNull(metadata)
  } else if (schema.type === 'array') {
    if (!schema.items)  throw `schema with type:array does not have 'items' specified`
    const items = schemaToMetadata(schema.items)
    imports = imports.concat(items.imports)
    t = Type.newArray(items.type,metadata)
  } else if (schema.type === 'object'){

    let properties: Type<'object'>|undefined = undefined
    if (!!schema.properties) {
      let fields: Record<string,Type<any>> = {}
      Object.entries(schema.properties).forEach(([fieldId,field])=>{
        let fieldType = schemaToMetadata(field)
        imports = imports.concat(fieldType.imports)
        fieldType.type.metadata.optional = !schema.required?.includes(fieldId)
        fields[fieldId] = fieldType.type
      }) 
      properties = Type.newObject(fields)
    }
    let additionalProperties: Type<any>|undefined 
    if (schema.additionalProperties === true) {
      additionalProperties = Type.newMap(Type.newString(),Type.newAny())
    } else if (schema.additionalProperties) {
      const s = schemaToMetadata(schema.additionalProperties)
      imports = imports.concat(s.imports)
      additionalProperties = Type.newMap(Type.newString(),s.type)
    }
    if (!properties  && !additionalProperties ){
      t = Type.newMap(Type.newAny(),Type.newAny(),metadata)
    } else {
      t = Type.newIntersection([properties,additionalProperties],metadata)  
    }
  } else if (!!schema.anyOf) {
    t = Type.newRef("Partial", [
        Type.newIntersection(
          schema.anyOf.map(
            t => {
              const s = schemaToMetadata(t)
              imports = imports.concat(s.imports)
              return s.type
            }
          )
        )
      ],metadata)
  } else if (!!schema.allOf) {
    t = Type.newIntersection(
      schema.allOf.map(
        t => {
          const s = schemaToMetadata(t)
          imports = imports.concat(s.imports)
          return s.type
        }
      ),
      metadata
    )
  } else if (!!schema.oneOf) {
    t = Type.newUnion(
      schema.oneOf.map(
        t => {
          const s = schemaToMetadata(t)
          imports = imports.concat(s.imports)
          return s.type
        }
      ),
      metadata
    )
  } else {
    console.error('warning: could not determine schema type, treating following schema as unknown:',schema)
    t = Type.newUnknown(metadata)
  }

  if (schema.not) {
    const not = schemaToMetadata(schema.not)
    imports = imports.concat(new Import('@openapi-adapter/core',{utility:null}),not.imports)
    t = Type.newRef("utility.Not",[t, not.type])
  }
  
  if ('nullable' in schema && schema.nullable) {
    t = Type.newUnion([t, Type.newNull()],metadata)
  }
  
  return {
    type: t,
    imports
  }

}