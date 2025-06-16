import mongoose from 'mongoose'

import UserDetails from './user.model.ts'


const tutorSchema = mongoose.Schema(
    {
	user: UserDetails,
	role:{
	    type: String,
	    required: true
	},

	groups:{
	    type: mongoose.Schema.Types.ObjectId,
	    ref: 'groups'
	}
    }
)

const Tutor = mongoose.model(
    'tutor',
    tutorSchema
)

export default Tutor

