import { fetchThreads } from '@/lib/actions/thread.actions'
import { currentUser } from '@clerk/nextjs'
import { ThreadCard } from '@/components/cards/ThreadCard'
import { redirect } from 'next/navigation'
import { fetchUser } from '@/lib/actions/user.actions'

export default async function Home() {
  const user = await currentUser()
  if(!user) return redirect('/sign-in')

  const userInfo = await fetchUser(user.id)
  if(!userInfo?.onboarded) redirect('/onboarding')

  //TODO: HARDCODED
  const result = await fetchThreads(1, 30)

  return (
    <div className='flex flex-col gap-6'>
      <h1 className='head-text text-left'>
        Home
      </h1>
      <section className='flex flex-col gap-6'>
        {result.threads.length === 0 ? (
            <p className='text-white italic'>No threads found</p>
          ) : (
            result.threads.map(thread => (
              <ThreadCard 
                key={thread._id}
                id={thread._id.toString()}
                currentUserId={userInfo._id.toString()}
                parentId={thread?.parentId}
                content={thread.text}
                author={thread.author}
                community={thread.community}
                createdAt={thread.createdAt}
                comments={thread.children}
              />
            ))
        )}
      </section>
    </div>
  )
}