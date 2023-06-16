import * as fs from 'fs'
import { TestApiDefinition } from './definition'

export async function generateTestApiDefinition(): Promise<void>
{
    const definition = TestApiDefinition
    const text = JSON.stringify(definition, null, 2)
    
    const target = `${__dirname}/../../../../../../../tests/__mocks__/TestApi.specification.ts`
    fs.writeFileSync(target, `/** @remarks generated code */\nexport interface TestApiSpecification\n${text}`)
}