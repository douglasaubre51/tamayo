import { Request, Response } from 'express'

// extras
import { Roles } from '../enums/roles.enum.ts'
import { TutorSignIn } from '../helpers/verifiers/tutorSignIn.verify.ts'
import { TutorSignUp } from '../helpers/verifiers/tutorSignUp.verify.ts'
import { StudentSignUp } from '../helpers/verifiers/studentSignUp.verify.ts'


export const SignIn = async ( req :Request, res :Response ) => {
    let { 
	email, 
	password,
	role
    } :String = req.body

    // validate fields
    if( email=='' || password=='' ){
	return res
	.status(400)
	.json({
	    message: 'enter all fields!'
	})
    }

    if( role == Roles.TUTOR )
	return await TutorSignIn( req, res )

    if( role == Roles.STUDENT )
	return await StudentSignIn(req, res )

    return res
    .status(400)
    .json({
	message: 'error signing in!'
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

    let userRole :string = req.body.role

    // tutor sign up
    if( userRole == Roles.TUTOR )
	return TutorSignUp( req, res )

    // student sign up
    if( userRole == Roles.STUDENT )
	return StudentSignUp( req, res )

    return res
    .status(400)
    .json({
	message: 'error signing up!'
    })
}
