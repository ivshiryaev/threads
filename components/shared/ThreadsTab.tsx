import { redirect } from 'next/navigation'
import { fetchUserPosts } from '@/lib/actions/user.actions'
import { ThreadCard } from '@/components/cards/ThreadCard'

interface Props {
	currentUserId: string,
	accountId: string,
	accountType?: string, 
}

async function ThreadsTab({
	currentUserId,
	accountId,
	accountType,
}: Props) {
	const threads = await fetchUserPosts(accountId)
	if(!threads) return redirect('/')

	return (
		<section className='flex flex-col gap-6'>
			{threads.map((thread: any) => (
				<ThreadCard
					key={thread._id}
					id={thread._id.toString()}
					currentUserId={currentUserId}
					parentId={thread?.parentId}
					content={thread.text}
					author={thread.author}
					community={thread.community}
					createdAt={thread.createdAt}
					comments={thread.comments}
				/>
			))}
		</section>
	)
}

export default ThreadsTab