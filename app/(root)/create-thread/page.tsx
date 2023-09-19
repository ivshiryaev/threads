import { currentUser } from '@clerk/nextjs'
import { fetchUser } from '@/lib/actions/user.actions'
import { PostThread } from'@/components/forms/PostThread'
import { redirect } from 'next/navigation'

async function Page() {
	const user = await currentUser()
	if(!user) return null

	const userInfo = await fetchUser(user.id)
	if(!userInfo?.onboarded) redirect ('onboarding')

	return (
		<div className='flex flex-col gap-4'>
			<h1 className='text-heading3-bold text-white'>Create thread</h1>
			<PostThread userId={userInfo._id.toString()}/>
		</div>
	)
}

export default Page