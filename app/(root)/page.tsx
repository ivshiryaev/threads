import { fetchThreads } from '@/lib/actions/thread.actions'
import { currentUser } from '@clerk/nextjs'
import { ThreadCard } from '@/components/cards/ThreadCard'

export default async function Home() {
  const user = await currentUser()
  
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
            result.threads.map(post => (
              <ThreadCard 
                key={post._id}
                id={post._id}
                currentUserId={user?.id}
                parentId={post?.parentId}
                content={post.text}
                author={post.author}
                community={post.community}
                createdAt={post.createdAt}
                comments={post.comments}
              />
            ))
        )}
      </section>
    </div>
  )
}