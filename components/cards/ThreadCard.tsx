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
	comments? : {
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

	let displayedComments = []

	if(comments && comments.length > 0){
		displayedComments = comments.slice(0,3)
	}

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
					<Link 
						className='w-fit font-semibold'
						href={`/profile/${author.id}`}
					>
						{author.username}
					</Link>
					<p className=''>
						{content}
					</p>
					<div className={`
						flex gap-1 mt-3
						${isComment && 'mb-8'}
					`}>
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
					</div>
				</div>
			</div>
			{comments && comments.length > 0 && (
				<div className='flex gap-3 items-center'>
					<Link 
						className='flex'
						href={`/thread/${id}`}
					>
						{displayedComments.map(comment => (
							<div className='mr-[-8px]'>
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
						{comments.length} replies
					</Link>
					<div className='text-sm text-light-4'>
						likes
					</div>
				</div>
			)}
		</article>
	)
}

export { ThreadCard }