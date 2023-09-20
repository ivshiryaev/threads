import { fetchUsers } from '@/lib/actions/user.actions'
import SuggestedUserCard from '@/components/cards/SuggestedUserCard'

async function SuggestedUsers({
	currentUserId,
} : {
	currentUserId: string,
}) {

	const data = await fetchUsers({
		userId: currentUserId,
	})

	return (
		<section className='grid gap-4'>
			{data?.users?.length > 0 && 
				data.users.map((user) => (
					<SuggestedUserCard
						key={user.id}
						id={user.id}
						name={user.name}
						username={user.username}
						image={user.image}
					/>
				))
			}
		</section>
	)
}

export default SuggestedUsers