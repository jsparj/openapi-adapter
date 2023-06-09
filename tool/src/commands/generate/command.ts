import {generateTestApiDefinition} from './test-api-definition/command'

const GENERATION_CHOISES = <const>['test-api-definition']

export function generate(): void
{
    generateTestApiDefinition()
}