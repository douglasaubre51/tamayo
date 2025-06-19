import mongoose from 'mongoose'


const UserDetails = {
    firstName:{
	type: String,
	required: true
    },
    lastName:{
	type: String,
	required: true
    },
    email:{
	type: String,
	required: true,
	unique: true
    },
    password:{
	type: String,
	required: true
    },
    profilePhoto: String
}

export default UserDetails

type User = {
    firstName :string,
    lastName :string,
    email :string,
    password :string,
    profilePhoto :string
}

export default User
