import { fetchUser } from '@/lib/actions/user.actions'
import { currentUser } from '@clerk/nextjs'
import { fetchCommunityDetails } from '@/lib/actions/community.actions'
import ProfileHeader from '@/components/shared/ProfileHeader'

async function Community({ params } : { params : { id : string }}) {
	const user = await currentUser()
	if(!user) return redirect('/sign-in')

	const userInfo = await fetchUser(user.id)
	if(!userInfo?.onboarded) redirect('/onboarding')

	const data = await fetchCommunityDetails(params.id)

	return (
		<section className='flex flex-col gap-4 text-white'>
			<div className='bg-dark-2 rounded-md p-6'>
				<ProfileHeader
					accountId={data.id}
					authUserId={userInfo.id}
					name={data.name}
					username={data.username}
					imgUrl={data.image}
					bio={data.bio}
				/>
			</div>
			{ data.members && (
				<div className='p-6 bg-dark-2 rounded-md w-fit'>
					<p className='
						text-transparent font-semibold
						bg-clip-text
						bg-gradient-to-r
						from-primary-500
						to-primary-700
					'>
						Members: {data.members.length + 1}
					</p>
				</div>
			)}
		</section>
	)
}

export default Community