import * as z from 'zod'

export const SearchValidation = z.object({
	text: 
		z.string()
		.nonempty()
		.min(1,{message: 'Type something here ⌨'})
})