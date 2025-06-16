import mongoose from 'mongoose'


const certificateSchema = mongoose.Schema(
    {
	points: Number,
	seen: Boolean,
	isVerified: Boolean,
	comment: String,

	title:{
	    type: String,
	    required: true
	},
	certificatePhoto:{
	    type: String,
	    required: true
	},

	student:{
	    type: mongoose.Schema.Types.ObjectId,
	    ref: 'student',
	    required: true
	},
	certificateTemplate:{
	    type: mongoose.Schema.Types.ObjectId,
	    ref: 'certificate_template',
	    required: true
	}
    }
)

const Certificate = mongoose.model(
    'certificate',
    certificateSchema
)

export default Certificate
