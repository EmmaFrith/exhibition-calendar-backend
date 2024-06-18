import express from 'express'
import User from '../models/user.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { secret } from '../config/environment.js'

const router = express.Router()

//lets use the errors from errors.js

router.post('/signup', async (req, res, next) => {

    try {
        // ! 1) validation
        // ? we've been able to skip checking uniqueness of email/user due to unique validators in User model
        //check password/conf

        if (req.body.password !== req.body.passwordConfirmation) {
            console.log('PASSWORDS DO NOTMATCH')
        }

        // ! 2) hash password
        const passwordHash = bcrypt.hashSync(req.body.password, 10)
        req.body.password = passwordHash

        // ! 3) save user to database
        const user = await User.create(req.body)

        res.status(201).json({
            message: `Welcome ${user.username}`
        })

    } catch (err) {
        next(err)
    }

})


router.post('/signin', async (req, res, next) => {

    try {
        const user = await User.findOne({ email: req.body.email })

        if (!user) {
            console.log("NOT USER")
        }

        const passwordsMatch = await bcrypt.compare(
            req.body.password,
            user.password
        )

        if (!passwordsMatch) {
            console.log("PASSWORDS DONT MATCH")
        }

        // ! Create token to send back
        const token = jwt.sign(
        //public payload
            {
                username: user.username,
                userId: user._id,
                isAdmin: user.isAdmin
            }, 
        //imported above from config/environment.js file
            secret,
            {
                expiresIn: "7d", //set expiry
            }
    )

        res.send({
            message: 'Welcome back',
            token
        })

    } catch (err) {
        next(err)
    }

})


export default router