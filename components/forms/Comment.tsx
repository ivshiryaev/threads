"use client"

import { usePathname, useRouter } from 'next/navigation'

import Image from 'next/image'

import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { CommentValidation } from '@/lib/validations/thread'
// import { createThread } from '@/lib/actions/thread.actions'

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

interface Props {
	threadId: string,
	currentUserId: string,
	currentUserImage: string,
}

function Comment({
	threadId,
	currentUser,
	currentUserId,
	currentUserImage,
} : Props ) {
	const router = useRouter()
	const pathname = usePathname()

	const form = useForm<z.infer<typeof CommentValidation>>({
		resolver: zodResolver(CommentValidation),
		defaultValues: {
			thread: '',
		}
	})

	async function onSubmit(values: z.infer<typeof ThreadValidation>){
		// await createThread({
		// 	text: values.thread,
		// 	author: userId,
		// 	communityId: null,
		// 	path: pathname,
		// })
		// router.push('/')
	}

	return (
		<Form {...form}>
			<form 
				onSubmit={form.handleSubmit(onSubmit)}
				className='
					flex gap-2 items-center justify-center
					border-y py-2 border-neutral-800
				'
			>
				<FormField
				  control={form.control}
				  name="thread"
				  render={({ field }) => (
				    <FormItem className='flex grow gap-2 items-center'>
				      <FormLabel className='w-11 h-11 relative'>
				      	<Image 
				      		src={currentUserImage}
				      		alt={currentUser}
				      		fill
				      		className='rounded-full object-cover'
				      	/>
				      </FormLabel>
				      <FormControl className='
					      	flex-1 text-base-semibold text-gray-200
					      '
					     >
				        <Input
				        	placeholder='Comment...'
				        	className='
				        		!m-0
				        		p-2 
				        		bg-transparent 
				        		no-focus 
				        		outline-none 
				        		border-none 
				        	'
				        	{...field} 
				        />
				      </FormControl>
				      <FormMessage/>
				    </FormItem>
				  )}
				/>
				<Button type='submit' className='bg-primary-500 rounded-full'>
					Reply
				</Button>
			</form>
		</Form>
	)
}

export { Comment }