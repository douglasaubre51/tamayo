import { Request, Response } from 'express'
import bcrypt from 'bcrypt'

import Tutor from '../../models/tutor.model.ts'


export const TutorSignIn = async ( req: Request, res :Response ) =>{
    try{
	let {
	    email,
	    password
	} = req.body

	console.log(`${email}\n${password}`)

	let dbUser :UserDoc | null = await Tutor.findOne({ 'user.email':  email })

	if( dbUser == null ){
	    return res
	    .status(400)
	    .json({
		message: 'user doesnot exists!'
	    })
	}

	let checkPassword :boolean = await bcrypt.compare( password, dbUser.user.password )

	if( !checkPassword ){
	    return res
	    .status(400)
	    .json({
		message: 'wrong password!'
	    })
	}

	// sign in user
	console.log('tutor signed in!')

    }catch(e){
	return res
	.status(400)
	.json({
	    message: `error signing in!:: ${e.message}`
	})
    }
}
