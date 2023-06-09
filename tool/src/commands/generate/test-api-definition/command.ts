import * as fs from 'fs'
import { TestApiDefinition } from './definition'

export async function generateTestApiDefinition(): Promise<void>
{
    const definition = TestApiDefinition
    const text = JSON.stringify(definition, null, 2)
    
    const target = `${__dirname}/../../../../../../../tests/__mocks__/TestApiDefinition.json`
    fs.writeFileSync(target,text)
}