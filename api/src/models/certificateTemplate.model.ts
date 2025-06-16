import mongoose from 'mongoose'


const certificateTemplateSchema = mongoose.Schema(
    {
	title:{
	    required: true,
	    type: String,
	},
	points:{
	    required: true,
	    type: String,
	},

	details: String
    }
)

const CertificateTemplate = mongoose.model(
    'certificate_templates',
    certificateTemplateSchema
)

export default CertificateTemplate
