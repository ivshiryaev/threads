"use client"

import { useRouter } from 'next/navigation'

import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { SearchValidation } from '@/lib/validations/Search'

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
	currentUserId: string,
}

function SearchBar({
  currentUserId,
} : Props){
  const router = useRouter()

  const form = useForm<z.infer<typeof SearchValidation>>({
    resolver: zodResolver(SearchValidation),
    defaultValues: {
      text: '',
    }
  })

  async function onSubmit(values: z.infer<typeof SearchValidation>){
    await router.push(`/search?text=${values.text}`)
  }

  return(
    <Form {...form}>
      <form 
        onSubmit={form.handleSubmit(onSubmit)}
        className='
          flex gap-2 items-center justify-center
          py-2 border-b border-neutral-800
        '
      >
        <FormField
          control={form.control}
          name="text"
          render={({ field }) => (
            <FormItem className='flex grow gap-2 items-center'>
              <FormControl className='
                  flex-1 text-base-semibold text-gray-200
                '
               >
                <Input
                  placeholder='Search...'
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
          Search
        </Button>
      </form>
    </Form>
  )
} 

export default SearchBar