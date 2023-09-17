import Link from 'next/link'
import Image from 'next/image'

interface Props{
	id : string,
	currentUserId : string,
	parentId : string | null,
	content : string,
	author : {
		name: string,
		image: string,
		id: string,
	},
	community : {
		id: string,
		name: string,
		image: string,
	} | null,
	createdAt : string,
	comments : {
		author: {
			image: string,
		}
	}[],
	isComment?: boolean,
}

function ThreadCard({
	id,
	currentUserId,
	parentId,
	content,
	author,
	community,
	createdAt,
	comments,
	isComment,
} : Props) {
	return (
		<article 
			className={`
				w-full
				rounded-xl
				p-6
				flex gap-3
				text-white
				${isComment ? 
					''
					:
					'bg-dark-2'
				}
			`}
		>
			<div className='flex flex-col items-center gap-2'>
				<Link 
					href={`/profile/${author.id}`}
					className='relative w-12 h-12'
				>
					<Image 
						alt={author.username}
						src={author.image}
						fill
						className='rounded-full'
					/>
				</Link>
				<div 
					className='w-0.5 relative bg-neutral-800 rounded-full grow'
				/>
			</div>
			<div 
				className='
					flex flex-col gap-1 flex-1
				'
			>
				<Link 
					className='w-fit font-semibold'
					href={`/profile/${author.id}`}
				>
					{author.username}
				</Link>
				<p className=''>
					{content}
				</p>
				<div className='flex gap-1 mt-3'>
					<Image
						alt='heart-icon'
						src='/assets/heart-gray.svg'
						width={24}
						height={24}
					/>
					<Link href={`/thread/${id}`}>
						<Image
							alt='reply-icon'
							src='/assets/reply.svg'
							width={24}
							height={24}
						/>
					</Link>
					<Image
						alt='repost-icon'
						src='/assets/repost.svg'
						width={24}
						height={24}
					/>
					<Image
						alt='share-icon'
						src='/assets/share.svg'
						width={24}
						height={24}
					/>
				</div>
			</div>
		</article>
	)
}

export { ThreadCard }