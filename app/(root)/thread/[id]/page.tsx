import { ThreadCard } from '@/components/cards/ThreadCard'
import { currentUser } from '@clerk/nextjs'
import { fetchUser } from '@/lib/actions/user.actions'
import { redirect } from 'next/navigation'
import { fetchThreadById } from '@/lib/actions/thread.actions'
import { Comment } from '@/components/forms/Comment'

async function Thread({ params } : { params : { id : string }}) {
	if(!params.id) return null

	const user = await currentUser()
	if(!user) return null

	const userInfo = await fetchUser(user.id)
	if(!userInfo?.onboarded) redirect('/onboarding')

	const thread = await fetchThreadById({id: params.id})

	return (
		<section 
			className='relative flex flex-col gap-6'
		>
			<ThreadCard 
		        key={thread._id}
		        id={thread._id}
		        currentUserId={user?.id}
		        parentId={thread?.parentId}
		        content={thread.text}
		        author={thread.author}
		        community={thread.community}
		        createdAt={thread.createdAt}
		        comments={thread.comments}
			/>
			<div>
				<Comment
					threadId={thread.id}
					currentUserId={userInfo._id.toString()}
					currentUserImage={user.imageUrl}
				/>
			</div>
		</section>
	)
}

export default Thread