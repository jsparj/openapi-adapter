export const DEFAULT_PARAMETER_SERIALIZATION_SETTINGS = <const>{
    path: {
        constants: {
            trueString: 'true',
            falseString: 'false',
            nullString: 'null',
            undefinedString: ''
        },
        default: {
            style: 'simple',
            explode: false,
        },
    },
    header: {
        constants: {
            trueString: 'true',
            falseString: 'false',
            nullString: 'null',
            undefinedString: ''
        },
        default: {
            explode: false,
        }
    },
    query: {
        constants: {
            trueString: 'true',
            falseString: 'false',
            nullString: 'null',
            undefinedString: '',
            prefix: '?',
            seperator: '&'
        },
        default: {
            style: 'form',
            explode: true,
            allowReserved: false
        }
    }
}