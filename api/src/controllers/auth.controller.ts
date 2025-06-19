import { Request, Response } from 'express'
import { TutorSignUp } from '../helpers/verifiers/tutorSignUp.verify.ts'

// extras
import { Roles } from '../enums/roles.enum.ts'



export const SignIn = async ( req :Request, res :Response ) => {
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


export const SignUp = async ( req :Request, res :Response ) =>{
    // verify role
    if( req.body.role == null ){
	return res
	.status(400)
	.json({
	    message: 'enter all fields! role is missing apparently!'
	})
    }

    let userRole :String = req.body.role

    // tutor sign up
    if( userRole == Roles.TUTOR )
	return TutorSignUp( req, res )
}
