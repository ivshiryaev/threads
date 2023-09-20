import { fetchUser, fetchUsers } from '@/lib/actions/user.actions'
import { currentUser } from '@clerk/nextjs'
import UserCard from '@/components/cards/UserCard'
import { redirect } from 'next/navigation'
import SearchBar from '@/components/forms/SearchBar'

async function Page({
	searchParams,
} : {
	searchParams: { [key: string]: string | string[] | undefined }
}) {
	const user = await currentUser()
	if(!user) return null

	const userInfo = await fetchUser(user.id)
	if(!userInfo?.onboarded) redirect('/onboarding')

	//Fetch Users
	const result = await fetchUsers({
		userId: user.id,
		searchString: searchParams.text && searchParams.text || '',
		pageNumber: 1,
		pageSize: 25,
	})

	return (
		<section className='flex flex-col grow gap-6'>
			<h1 className='text-heading3-bold text-white'>Search</h1>

			<SearchBar/>

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

export default Page