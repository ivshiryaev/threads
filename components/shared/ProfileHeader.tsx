import Image from 'next/image'
import { UserButton, UserProfile } from '@clerk/nextjs'
import ProfileSettings from '@/components/feature/ProfileSettings'

interface Props {
	accountId : string,
	authUserId : string,
	name : string,
	username : string,
	imgUrl : string,
	bio : string,
}

function ProfileHeader({
	accountId,
	authUserId,
	name,
	username,
	imgUrl,
	bio,
} : Props) {

	const isAuthUserProfile = accountId == authUserId

	function handleSettingsClick(){
		window.Clerk.openUserProfile()
	}

	return (
		<article className='
				w-full 
				flex flex-col justify-start
				gap-4
			'
		>
			<div className='flex gap-2 items-center'>
				<div className='relative w-16 h-16'>
					<Image
						className='rounded-full object-cover'
						src={imgUrl}
						alt={username}
						fill
					/>
				</div>
				<div className='grow flex justify-between items-center'>
					<div>
						<p className='text-xl font-semibold'>{name}</p>
						<p className='text-sm text-neutral-400'>@{username}</p>
					</div>
					{isAuthUserProfile && 
						<ProfileSettings>
							Settings	
						</ProfileSettings>
					}
				</div>

			</div>
			<div className='text-sm'>
				{bio}
			</div>
		</article>
	)
}

export default ProfileHeader