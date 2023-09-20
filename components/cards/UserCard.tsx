"use client"

import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'

interface Props {
	id: string,
	name: string,
	username: string,
	imgUrl: string,
	personType: string,
}

function UserCard({
	id,
	name,
	username,
	imgUrl,
	personType,
} : Props) {
	const router = useRouter()

	return (
		<article className='grow flex gap-3 items-center'>
			<div className='relative w-16 h-16'>
				<Image
					className='rounded-full object-cover'
					src={imgUrl}
					alt={username}
					fill
				/>
			</div>
			<div className='flex-1 gap-0'>
				<p className='font-semibold text-white text-lg leading-tight'>{name}</p>
				<p className='text-neutral-300 text-sm'>@{username}</p>
			</div>
			<div>
				<Button 
					className='bg-primary-500 px-6'
					onClick={() => router.push(`/profile/${id}`)}
				>
					View
				</Button>
			</div>
		</article>
	)
}

export default UserCard