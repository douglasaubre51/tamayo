import express from 'express'
import { SignIn } from '../controllers/auth.controller.ts'


export const router = express.Router()

router.post(
	'/sign-in',
	SignIn
)

