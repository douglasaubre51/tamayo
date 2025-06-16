import mongoose from 'mongoose'

import userDetails from './userDetails.model.ts'


const studentSchema = mongoose.Schema(
    {
	user:{
	    type: userDetails,
	    required: true
	},
	role:{
	    type: String,
	    required: true
	},

	totalPoints:{
	    type: Number,
	    default: 0
	},

	certificates:[{
	    type: mongoose.Schema.Types.ObjectId,
	    ref: 'certificates'
	}],
    }
)

const Student = mongoose.model(
    'students',
    studentSchema
)

export default Student
