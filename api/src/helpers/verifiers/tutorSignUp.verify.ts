import { Request, Response } from 'express'
import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

import User from '../../models/userDetails.model.ts'
import Tutor from '../../models/tutor.model.ts'
import Student from '../../models/student.model.ts'

// extras
import { Roles } from '../../enums/roles.enum.ts'


export const TutorSignUp = async ( req :Request, res:Response ) =>{
    const {
	firstName,
	lastName,
	email,
	password,
	passkey,
	role
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
	const user :User = {
	    firstName,
	    lastName,
	    email,
	    password: hashedPassword
	}

	let tutor = new Tutor({
	    user: user,
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
