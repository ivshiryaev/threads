import { fetchUser, fetchUsers, getActivity } from '@/lib/actions/user.actions'
import { currentUser } from '@clerk/nextjs'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'

async function Activity() {
	const user = await currentUser()
	if(!user) return null

	const userInfo = await fetchUser(user.id)
	if(!userInfo?.onboarded) redirect('/onboarding')

	const replies = await getActivity(userInfo._id)

	return (
		<section className='flex flex-col gap-6'>
			<h1 className='text-heading3-bold text-white'>Activity</h1>

			{replies.length > 0 ? (
				<>
					{replies.map((reply) => (
						<Link 
							key={reply._id} 
							href={`/thread/${reply.parentId}`}
						>
							<article 
								className='
									p-2 
									flex gap-3 items-center
									rounded-lg
									text-white 
									bg-dark-2
								'
							>
								<div className='relative w-10 h-10'>
									<Image
										className='object-cover rounded-full'
										src={reply.author.image}
										alt={reply.author.name}
										fill
									/>
								</div>
								<p className='font-semibold text-primary-500'>
									@{reply.author.username}
								</p>
								<span>
									Replied to your thread !
								</span>
							</article>
						</Link>
					))}
				</>
			) : (
				<p className='text-white italic'>No replies</p>
			)}
		</section>
	)
}

export default Activity