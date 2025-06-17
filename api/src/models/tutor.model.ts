import mongoose from 'mongoose'

import UserDetails from './userDetails.model.ts'


const tutorSchema = mongoose.Schema(
    {
	user: UserDetails,
	role:{
	    type: Number,
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

