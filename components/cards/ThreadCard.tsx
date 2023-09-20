import Link from 'next/link'
import Image from 'next/image'
import { isThreadLikedByUser, switchLike, getLikesCount } from '@/lib/actions/like.actions'
import Like from '@/components/feature/Like'
import { revalidatePath } from 'next/navigation'
import { formatDateString } from '@/lib/utils'

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
	comments? : {
		author: {
			image: string,
		}
	}[],
	isComment?: boolean,
}

async function ThreadCard({
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
	const isLiked = await isThreadLikedByUser({
		userId: currentUserId,
		threadId: id,
	})

	const likesCount = await getLikesCount(id)

	let displayedComments = []

	if(comments && comments.length > 0){
		displayedComments = comments.slice(0,3)
	}

	const displayDate = formatDateString(createdAt)

	return (
		<article 
			className={`
				w-full
				p-6
				flex flex-col gap-3
				rounded-xl
				text-white
				${isComment ? 
					'py-0'
					:
					'bg-dark-2'
				}
			`}
		>
			<div className='flex gap-3'>
				<div className='flex flex-col items-center'>
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
						className='w-0.5 relative bg-light-4 rounded-full grow'
					/>
				</div>
				<div 
					className='
						flex flex-col gap-1 flex-1
					'
				>
					<div className='flex justify-between'>
						<Link 
							className='w-fit font-semibold'
							href={`/profile/${author.id}`}
						>
							{author.username}
						</Link>
						<p className='text-sm text-light-4'>{displayDate}</p>
					</div>
					<p className=''>
						{content}
					</p>
					<div className={`
						flex gap-1 mt-3
						${isComment && 'mb-8'}
					`}>
						<Like 
							userId={currentUserId} 
							threadId={id} 
							isLiked={isLiked}
						/>
						<Link href={`/thread/${id}`}>
							<Image
								alt='reply-icon'
								src='/assets/reply.svg'
								width={24}
								height={24}
							/>
						</Link>
					</div>
				</div>
			</div>
			<div className='flex gap-3 items-center'>
				{comments && comments.length > 0 && (
					<>
						<Link 
							className='flex'
							href={`/thread/${id}`}
						>
							{displayedComments.map(comment => (
								<div 
									className='mr-[-8px]' 
									key={comment._id}
								>
									<Image
										className='rounded-full'
										src={comment.author.image}
										alt={comment.author.username}
										width={20}
										height={20}
									/>
								</div>
							))}
						</Link>
						<Link 
							className='ml-2 text-sm text-light-4'
							href={`/thread/${id}`}
						>
							{comments.length} 
							{comments.length == 1 ? ' reply' : ' replies'}
						</Link>
					</>
				)}
				{likesCount > 0 && (
					<p className='text-sm text-light-4'>
						{likesCount}
						{likesCount == 1 ? ' like' : ' likes'}
					</p>
				)}
			</div>
		</article>
	)
}

export { ThreadCard }