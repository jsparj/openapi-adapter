export const DEFAULT_PARAMETER_SERIALIZATION_SETTINGS = <const>{
    pathString: {
        constants: {
            trueString: 'true',
            falseString: 'false',
            nullString: 'null',
            undefinedString: ''
        },
        defaultSerialization: {
            style: 'simple',
            explode: false,
        }
    },
    header: {
        constants: {
            trueString: 'true',
            falseString: 'false',
            nullString: 'null',
            undefinedString: ''
        },
        defaultSerialization: {
            explode: false,
        }
    },
    queryString: {
        constants: {
            trueString: 'true',
            falseString: 'false',
            nullString: 'null',
            undefinedString: '',
            prefix: '?',
            seperator: '&'
        },
        defaultSerialization: {
            style: 'form',
            explode: true,
            allowReserved: false
        }
    }
}