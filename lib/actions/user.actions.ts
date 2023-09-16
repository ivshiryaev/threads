"use server"

import User from '../models/user.model'
import { connectToDB } from '../mongoose'

interface Params {
	userId: string,
	username: string,
	name: string,
	bio: string,
	image: string,
	path: string,
}

export async function updateUser({
	userId,
	username,
	name,
	bio,
	image,
	path,
} : Params): Promise<void> {
	
	await connectToDB()

	try {
		await User.findOneAndUpdate(
			{
				id: userId
			},
			{
				username: username.toLowerCase(),
				name,
				bio,
				image,
				onboarded: true,
			},
			{
				upsert: true
			}
		)

		if(path === 'profile/edit'){
			revalidatePath(path)
		}
	} catch (e: any) {
		throw new Error(`Failed to update/create user: ${e.message}`)
	}
}

export async function fetchUser(userId: string){
	await connectToDB()

	try{
		const user = await User.findOne({
			id: userId 
		})
		return user
	} catch(error) {
		throw new Error(`Can't find user: ${userId}, error: ${error}`)
	}
}