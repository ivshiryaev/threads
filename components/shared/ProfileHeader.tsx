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
		<div className='
				w-full 
				flex flex-col justify-start
				gap-4
			'
		>
		<div className='flex gap-2 items-center'>
			<Image
				className='rounded-full'
				src={imgUrl}
				alt={username}
				width={72}
				height={72}
			/>
			<div>
				<p className='text-xl font-semibold'>{name}</p>
				<p className='text-sm text-neutral-400'>@{username}</p>
			</div>
		</div>
		<div className='text-sm'>
			{bio}
		</div>
		<div className='grow h-0.5 bg-neutral-800 rounded-full'/>
		</div>
	)
}

export default ProfileHeader