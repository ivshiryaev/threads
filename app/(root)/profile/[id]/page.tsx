import { currentUser } from '@clerk/nextjs'
import { fetchUser } from '@/lib/actions/user.actions'
import { redirect } from 'next/navigation'
import ProfileHeader from '@/components/shared/ProfileHeader'
import { 
	Tabs, 
	TabsContent, 
	TabsList, 
	TabsTrigger 
} from "@/components/ui/tabs"
import { profileTabs } from '@/constants'
import Image from 'next/image'
import ThreadsTab from '@/components/shared/ThreadsTab'

async function Profile({ params } : { params : { id : string }}) {
	const user = await currentUser()
	if(!user) return null

	const userInfo = await fetchUser(params.id)
	if(!userInfo?.onboarded) redirect('/onboarding')

	return (
		<div className='flex flex-col gap-6 text-white'>
			<ProfileHeader
				accountId={params.id}
				authUserId={user.id}
				name={userInfo.name}
				username={userInfo.username}
				imgUrl={userInfo.image}
				bio={userInfo.bio}
			/>
			<Tabs defaultValue="threads" className='flex flex-col gap-4'>
			  <TabsList className='bg-dark-2 gap-1 w-full rounded-md p-1'>
			  	{profileTabs.map(tab => (
				    <TabsTrigger
				    	key={tab.label}
				    	className='
				    		flex flex-1 gap-1 rounded-md
				    	'
				    	value={tab.value}
				    >
				    	<Image
				    		src={tab.icon}
				    		alt={tab.label}
				    		width={20}
				    		height={20}
				    	/>
				    	<p className='max-sm:hidden'>{tab.label}</p>
				    	{tab.label === 'Threads' && (
				    		<p className='
			    				ml-1 
			    				px-2
			    				rounded-md 
			    				bg-dark-1 
			    				text-light-2
			    				text-sm
			    			'>
				    			{userInfo?.threads?.length}
				    		</p>
				    	)}
				    </TabsTrigger>
			  	))}
			  </TabsList>
			  <TabsContent value="threads">
			  	<ThreadsTab
			  		currentUserId={userInfo._id.toString()}
			  		accountId={params.id}
			  	/>
			  </TabsContent>
			</Tabs>
		</div>
	)
}

export default Profile