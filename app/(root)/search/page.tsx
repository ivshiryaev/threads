import { fetchUser, fetchUsers } from '@/lib/actions/user.actions'
import { currentUser } from '@clerk/nextjs'
import UserCard from '@/components/cards/UserCard'

async function Search() {
	const user = await currentUser()
	if(!user) return null

	const userInfo = await fetchUser(user.id)
	if(!userInfo?.onboarded) redirect('/onboarding')

	//Fetch Users
	const result = await fetchUsers({
		userId: user.id,
		searchString: '',
		pageNumber: 1,
		pageSize: 25,
	})

	return (
		<section className='flex flex-col grow gap-6'>
			<p className='text-heading3-bold text-white'>Search</p>

			{/*Search bar*/}

			{result.users.length === 0 ? (
				<p className='italic'>No users</p>
			) : (
				result.users.map((person) => (
					<UserCard
						key={person.id}
						id={person.id}
						name={person.name}
						username={person.username}
						imgUrl={person.image}
						personType='User'
					/>
				))
			)}
		</section>
	)
}

export default Search