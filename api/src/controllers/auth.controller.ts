import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

import Roles from '../enums/roles.enum.ts'
import Tutor from '../models/tutor.model.ts'
import Student from '../models/student.model.ts'


export const SignIn = async (req,res) => {
    const { email , password } :String = req.body

    console.log(`email: ${email}, password: ${password}`)

    if( email=='' | password=='' ){
	return res
	.status(400)
	.json({
	    message: 'empty email or password fields!'
	})
    }

    try{
	// check if user is tutor
	let dbUser :any = await Tutor.findOne({ email })

	if( dbUser == null ){
	    // check if user is student
	    dbUser = await Student.findOne({ email })

	    if( dbUser == null ){
		return res
		.status(400)
		.json({
		    message: 'invalid email!'
		})
	    }

	    // authenticate student
	    if( password == dbUser.password ){
		// student login
		console.log('tutor logged in!')

		return res
		.status(200)
		.json({
		    message: 'tutor logged in!'
		})
	    }

	    return res
	    .status(400)
	    .json({
		message: 'wrong password!'
	    })
	}
    }catch(e){
	return res
	.status(500)
	.json({
	    message: 'db error!'
	})
    }

    // authenticate student
    if( password == dbUser.password ){
	// student login
	console.log('student logged in!')
    }

    return res
    .status(400)
    .json({
	message: 'wrong password!'
    })
}


export const SignUp = async (req,res) =>{
    // verify role
    if( req.body.role == null ){
	return res
	.status(400)
	.json({
	    message: 'enter all fields! role is missing apparently!'
	})
    }

    const role :String = req.body.role

    // tutor sign up
    if( role == Roles.TUTOR ){
	const {
	    firstName,
	    lastName,
	    email,
	    password,
	    passkey
	} = req.body

	// verify fields
	if( firstName == '' || lastName == '' || email == '' || password == '' || passkey == '' ){
	    return res
	    .status(400)
	    .json({
		message: 'enter all fields!'
	    })
	}

	// check passkey
	if( passkey != process.env.TUTOR_PASSKEY ){
	    return res
	    .status(400)
	    .json({
		message: 'wrong passkey!'
	    })
	}

	try{
	    // create tutor
	    const hashedPassword :String = await bcrypt.hash( password, 12 )

	    let tutor = new Tutor({
		firstName,
		lastName,
		email,
		hashedPassword,
		role
	    })
	    await tutor.save()
	}catch(e){
	    return res
	    .status(500)
	    .json({
		message: `db or bcrypt error!\n${e.message}`
	    })

	}

	return res
	.status(201)
	.json({
	    message: 'new tutor account created!'
	})
    }
}
