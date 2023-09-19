"use server"

import Like from '@/lib/models/like.model'
import { connectToDB } from '../mongoose'
import { revalidatePath } from "next/cache";

export async function isThreadLikedByUser({
	userId, 
	threadId,
} : {
	userId: string,
	threadId: string,
}){
	try{
		connectToDB()

		const like = Like.where({
			userId: userId,
			threadId: threadId,
		})

		const result = await like.findOne()

		if(!result) return false

		return true

	} catch(error) {
		throw new Error(`Can't check isThreadLikedByUser ${error.message}`)
	}
}

export async function switchLike({
	userId,
	threadId,
	isLiked,
	path,
} : {
	userId: string,
	threadId: string,
	isLiked: boolean,
	path: string,
}){
	try{ 
		connectToDB()

		//Delete the like if it exists, otherwise, create one
		if(isLiked){
			const findLike = await Like.findOneAndDelete({
				userId: userId,
				threadId: threadId,
			})

			console.log('Existing like deleted')
		} else {
			const like = await Like.create({
				userId: userId,
				threadId: threadId,
			})

			console.log('New like created')
		}

		revalidatePath()
	} catch(error) {
		throw new Error(`Can't switchLike ${error.message}`)
	}
}

export async function getLikesCount(threadId: string){
	try{
		connectToDB()

		const threadLikes = await Like.countDocuments({
			threadId: threadId,
		})

		if(!threadLikes) return null

		return threadLikes
	} catch(error: any){
		throw new Error(`Can't get likes ${error.message}`)
	}
}