"use client"

import React from 'react'
import { Button } from '@/components/ui/button'

function ProfileSettingsButton({children} : {children: React.ReactNode}) {
	function handleClick(){
		window.Clerk.openUserProfile()
	}
	return (
		<Button className='bg-primary-500' onClick={handleClick}>
			{children}
		</Button>
	)
}

export default ProfileSettingsButton