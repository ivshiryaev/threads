"use client"

import Image from 'next/image'
import Link from 'next/link'
import { sidebarLinks } from '@/constants'
import { usePathname, useRouter } from 'next/navigation'
import { SignedIn, SignOutButton, useAuth } from '@clerk/nextjs'

function LeftSidebar(){
	const router = useRouter()
	const pathname = usePathname()
	const { userId } = useAuth()

	return (
		<aside className='custom-scrollbar leftsidebar'>
			<div className='
					px-6
					w-full 
					flex flex-1 flex-col
					gap-4
				'
			>
				{sidebarLinks.map(link => {
					const isActive = 
						pathname.includes(link.route) &&
						link.route.length > 1 ||
						pathname === link.route

					if(link.route === '/profile'){
						link.route = `${link.route}/${userId}`
					}

					return(
						<Link 
							key={link.label}
							href={link.route}
							className={`
								leftsidebar_link
								${isActive && 'bg-primary-500'}
								hover:bg-dark-1
							`}
						>
							<Image
								src={link.imgURL}
								alt={link.label}
								width={28}
								height={28}
							/>
							<p className='text-white max-lg:hidden'>
								{link.label}
							</p>
						</Link>
					)
				})}
			</div>
			<div className='px-6'>
				<SignedIn>
					<SignOutButton
						signOutCallback = 
							{() => router.push('/sign-in')}
					>
						<div className='
							leftsidebar_link cursor-pointer
							hover:bg-dark-1
						'>
							<Image 
								src='/assets/logout.svg'
								alt='logout'
								width={24}
								height={24}
							/>
							<p className='max-lg:hidden text-light-2'>Logout</p>
						</div>
					</SignOutButton>
				</SignedIn>
			</div>
		</aside>
	)
}

export default LeftSidebar