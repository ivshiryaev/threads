import * as z from 'zod'

export const ThreadValidation = z.object({
	thread: 
		z.string()
		.nonempty({message: 'Write something'})
		.min(3,{message: 'At least 3 characters'})
})

export const CommentValidation = z.object({
	thread: 
		z.string()
		.nonempty()
		.min(3,{message: 'Minimum 3 characters'})
})