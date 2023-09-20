"use server"

import mongoose from 'mongoose'

let isConnected = false

export async function connectToDB(){
	// Set strict query mode for Mongoose to prevent unknown field queries.
	mongoose.set("strictQuery", true);

	if(!process.env.MONGODB_URL) return console.log('MONGODB_URL isn\'t found')

	try {
		await mongoose.connect(process.env.MONGODB_URL)
		isConnected = true
		console.log('MongoDB connected')
	} catch(e) {
		console.error({message: e.message})
	}
}