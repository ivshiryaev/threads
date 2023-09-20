"use client"

import Image from 'next/image'
import { switchLike } from '@/lib/actions/like.actions'
import { usePathname } from 'next/navigation'

function Like({
	userId,
	threadId,
	isLiked,
} : {
	userId: string,
	threadId: string,
	isLiked: boolean,
}) {
	const pathname = usePathname()

	async function handleClick(){
		await switchLike({
			userId: userId,
			threadId: threadId,
			isLiked: isLiked,
			path: pathname,
		})
	}

	return (
		<>
		{isLiked ? (
			<Image
				onClick={()=>handleClick()}
				className='cursor-pointer'
				alt='heart-icon'
				src='/assets/heart-filled.svg'
				width={24}
				height={24}
				priority
			/>
		) : (
			<Image
				onClick={()=>handleClick()}
				className='cursor-pointer'
				alt='heart-icon'
				src='/assets/heart-gray.svg'
				width={24}
				height={24}
				priority
			/>
		)}
		</>
	)
}

export default Like