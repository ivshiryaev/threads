import { fetchCommunities } from '@/lib/actions/community.actions'
import CommunityCard from '@/components/cards/CommunityCard'

async function Communities() {

	const data = await fetchCommunities({})

	return (
		<section className='flex flex-col gap-2'>
			<h1 className='text-heading3-bold text-white'>Communities</h1>
			{data.communities.length > 0 && (
				<div className='
					grid gap-4 grid-cols-1
					sm:grid-cols-2
				'>
					{data.communities.map((community) =>(
						<CommunityCard
							key={community.id}
							id={community.id}
							name={community.name}
							image={community.image}
						/>
					))}
				</div>
			)}
		</section>
	)
}

export default Communities