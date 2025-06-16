import mongoose from 'mongoose'


const groupSchema = mongoose.Schema(
    {
	title: String,
	profilePhoto: String,
	groupGUID: String,

	students:[{
	    type: mongoose.Schema.Types.ObjectId,
	    ref: 'students'
	}],
	tutors:[{
	    type: mongoose.Scheme.Types.ObjectId,
	    ref: 'tutors'
	}],
	cerificateTemplates:[{
	    type: mongoose.Scheme.Types.ObjectId,
	    ref: 'certificate_templates'
	}]
    }
)

const Group = mongoose.model(
    'group',
    groupSchema
)

export default Group
