import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'

function CommunityCard({
	id,
	name,
	image,
}:{
	id: string,
	name: string,
	image: string,
}) {

	//TODO: members hardcoded

	return (
		<article className='
			grow
			flex flex-col gap-3 p-6 bg-dark-2 text-white rounded-md
		'>
			<div className='flex gap-3'>
				<div className='relative w-12 h-12'>
					<Image
						className='rounded-full object-cover'
						src={image}
						alt={name}
						fill
					/>
				</div>
				<div>
					<Link 
						className='font-semibold text-xl'
						href={`/community/${id}`}
					>
						{name}
					</Link>
					<p className='text-gray-2 text-sm'>1 member</p>
				</div>
			</div>
			<Button className='bg-primary-500'>
				Join
			</Button>
		</article>
	)
}

export default CommunityCard