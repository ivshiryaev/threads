import Image from 'next/image'

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
				<div>
					<p className='text-xl font-semibold'>{name}</p>
					<p className='text-sm text-neutral-400'>@{username}</p>
				</div>
			</div>
			<div className='text-sm'>
				{bio}
			</div>
		</article>
	)
}

export default ProfileHeader