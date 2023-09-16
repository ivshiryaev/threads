"use client"

import { usePathname, useRouter } from 'next/navigation'

import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { ThreadValidation } from '@/lib/validations/thread'
import { createThread } from '@/lib/actions/thread.actions'

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'

interface Props {
	userId: string
}

function PostThread({ userId } : Props) {
	const router = useRouter()
	const pathname = usePathname()

	const form = useForm<z.infer<typeof UserValidation>>({
		resolver: zodResolver(ThreadValidation),
		defaultValues: {
			thread: '',
			accountId: userId,
		}
	})

	async function onSubmit(values: z.infer<typeof ThreadValidation>){
		await createThread({
			text: values.thread,
			author: userId,
			communityId: null,
			path: pathname,
		})
		router.push('/')
	}

	return (
		<Form {...form}>
			<form 
				onSubmit={form.handleSubmit(onSubmit)}
				className='flex flex-col justify-start gap-6'
			>
				<FormField
				  control={form.control}
				  name="thread"
				  render={({ field }) => (
				    <FormItem className='flex flex-col items-start w-full'>
				      <FormLabel 
				      	className='text-base-semibold text-light-3'
				      >
				      	Content
				      </FormLabel>
				      <FormControl className='
					      	flex-1 text-base-semibold text-gray-200
					      '
					     >
				        <Textarea
				        	rows={13}
				        	className='account-form_input'
				        	{...field} 
				        />
				      </FormControl>
				      <FormMessage/>
				    </FormItem>
				  )}
				/>
				<Button type='submit' className='bg-primary-500'>
					Post Thread
				</Button>
			</form>
		</Form>
	)
}

export { PostThread }