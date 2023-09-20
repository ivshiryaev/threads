import { currentUser } from '@clerk/nextjs'
import { fetchUser } from '@/lib/actions/user.actions'
import { fetchUsers } from '@/lib/actions/user.actions'

import SuggestedUsers from '@/components/shared/SuggestedUsers'
import SuggestedCommunities from '@/components/shared/SuggestedCommunities'

async function RightSidebar(){
	const user = await currentUser()
	if(!user) return null

	const userInfo = await fetchUser(user.id)
  	if(!userInfo?.onboarded) redirect('/onboarding')

	return (
		<aside className='rightsidebar custom-scrollbar'>
			{/*<div className='h-full flex flex-col gap-2'>
				<h3 className='text-lg font-semibold'>Suggested Communities</h3>
				<SuggestedCommunities/>
			</div>*/}
			<div className='h-full flex flex-col gap-2 text-white'>
				<h3 className='text-lg font-semibold'>Suggested Users</h3>
				<SuggestedUsers
					currentUserId={userInfo.id}
				/>
			</div>

		</aside>
	)
}

export default RightSidebar