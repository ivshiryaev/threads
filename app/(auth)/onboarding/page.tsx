import AccountProfile from '@/components/forms/AccountProfile'
import { currentUser } from '@clerk/nextjs'

async function Page() {
	const user = await currentUser()

	const userInfo = {}
	
	const userData = {
		id: user?.id,
		objectId: userInfo?.id,
		username: userInfo?.username || user?.username,
		name: userInfo?.name || user?.firstname || '',
		bio: userInfo?.bio || '',
		image: userInfo?.image || user.imageUrl,
	}

	return (
		<main
			className='
				flex flex-col justify-start
				gap-8
				px-10 py-20 
				mx-auto 
				max-w-3xl
			'
		>
			<div className='flex flex-col gap-2'>
				<h1 className='head-text'>Onboarding</h1>
				<p className='
						text-base-regular text-light-2
					'
				>
					Complete your profile to use threads
				</p>
			</div>
			<section className='bg-dark-2 p-10 rounded-lg'>
				<AccountProfile
					user={ userData }
					btnTitle='Continue'
				/>
			</section>
		</main>
	)
}

export default Page