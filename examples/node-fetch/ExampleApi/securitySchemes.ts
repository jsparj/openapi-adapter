//[generated code]: DO NOT EDIT DIRECTLY
export namespace securityScheme {
	export type authorization = {
		type: `apiKey`
		payload: {
			in: `header`
			name: `Authorization`
			value: string
		}
	}
	export type mutualTLS = {
		type: `mutualTLS`
		payload: {
			in: string
			name: string
			value: string
		}
	}
}
