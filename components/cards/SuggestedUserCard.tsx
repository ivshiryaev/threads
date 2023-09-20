import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

function SuggestedUserCard({
	id,
	name,
	username,
	image,
} : {
	id: string,
	name: string,
	username: string,
	image: string,
}) {
	return (
		<Link 
			className='flex gap-2 px-4 py-2 rounded-md hover:bg-dark-1'
			href={`/profile/${id}`}
		>
			<div className='relative w-12 h-12 rounded-full'>
				<Image
					className='object-cover rounded-full'
					src={image}
					alt={username}
					fill
				/>
			</div>
			<div className='flex flex-col justify-center'>
				<p className='text-sm font-semibold'>@{username}</p>
			</div>
		</Link>
	)
}

export default SuggestedUserCard