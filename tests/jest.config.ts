import { Config } from 'jest'

const packagesFolder = `${__dirname}/../packages`

const config: Config = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    testMatch: [
        '**/core/**/*.spec.ts',
        '**/fetch/**/*.spec.ts',
    ],
    transform: {
        "^.+\\.(t|j)s$": ['ts-jest',{
            tsconfig: `${__dirname}/tsconfig.json`,
        }]
    },
    moduleNameMapper: {
        "@openapi-adapter/core": `${packagesFolder}/core`,
        "@openapi-adapter/fetch": `${packagesFolder}/fetch`,
        "@openapi-adapter/iterated": `${packagesFolder}/iterated`
    }
}

export default config