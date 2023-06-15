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
        "^.+\\.ts$": ['ts-jest',{
            tsconfig: `${__dirname}/tsconfig.json`,
        }]
    },
    roots: [
        '<rootDir>'
    ],
    moduleDirectories: [
        'node_modules',
        '<rootDir>/../packages/core',
        '<rootDir>/../packages/iterated',
        '<rootDir>/../packages/fetch'
    ],
    moduleNameMapper: {
        "@openapi-adapter/core": '<rootDir>/../packages/core',
        "@openapi-adapter/iterated": '<rootDir>/../packages/iterated',
        "@openapi-adapter/fetch": '<rootDir>/../packages/fetch',
    }
}

export default config