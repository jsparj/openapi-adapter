import * as fs from 'fs'
import { TestApiDefinition } from './definition'

export async function generateIteratedTestApiDefinition(): Promise<void>
{
    const definition = TestApiDefinition
    const json = JSON.stringify(definition, null, 2)
    
    const target = `${__dirname}/../../../../../../../tests/__mocks__/IteratedTestApi.definition.ts`
    fs.writeFileSync(target,
        '// GENERATED CODE: Do not make direct changes!\n'
        + 'import type { iterated } from \'@openapi-adapter/core\'\n'
        + 'export interface IteratedTestApiSpecification\n'
        + json + '\n'
        + 'export type IteratedTestApiDefinition = iterated.Definition<IteratedTestApiSpecification>\n'
    )
}