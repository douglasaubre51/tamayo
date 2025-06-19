import { Request, Response } from 'express'
import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

import User from '../../models/userDetails.model.ts'
import Student from '../../models/student.model.ts'


export const StudentSignUp = async ( req :Request, res:Response ) =>{
    const {
	firstName,
	lastName,
	email,
	password,
	role
    } = req.body

    // verify fields
    if( firstName == '' || lastName == '' || email == '' || password == '' ){
	return res
	.status(400)
	.json({
	    message: 'enter all fields!'
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

	let student = new Student({
	    user: user,
	    role
	})

	await student.save()

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
	message: 'new student account created!'
    })
}
