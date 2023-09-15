import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
	id: { type: String, required: true },
	username: { type: String, required: true, unique: true },
	name: { type: String, required: true },
	bio: String,
	image: String,
	threads: [{
		type: mongoose.Schema.Types.ObjectID,
		ref: 'Thread',
	}],
	onboarded: {
		type: Boolean,
		default: false,
	},
	communities:[{
		type: mongoose.Schema.Types.ObjectID,
		ref: 'Community',
	}],
})

const User = mongoose.models.User || mongoose.model('User', userSchema)

export default User