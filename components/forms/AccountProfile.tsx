"use client"

interface Props {
	user: {
		id: string,
		objectId: string, 
		username: string,
		name: string,
		bio: string,
		image: string,
	}
	btnTitle: string
}

function AccountProfile({ user, btnTitle } : Props) {
	return (
		<div>
			AccountProfile
		</div>
	)
}

export default AccountProfile