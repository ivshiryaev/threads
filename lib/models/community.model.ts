import mongoose from 'mongoose'

const communitySchema = new mongoose.Schema({
	id: { type: String, required: true },
	username: { type: String, required: true, unique: true },
	name: { type: String, required: true },
	bio: String,
	image: String,
	createdBy: {
		type: mongoose.Schema.Types.ObjectID,
		ref: 'User',
	},
	threads: [{
		type: mongoose.Schema.Types.ObjectID,
		ref: 'Thread',
	}],
	members:[{
		type: mongoose.Schema.Types.ObjectID,
		ref: 'User',
	}]
})

const Community = 
	mongoose.models.Community || 
	mongoose.model('Community', communitySchema)

export default Community