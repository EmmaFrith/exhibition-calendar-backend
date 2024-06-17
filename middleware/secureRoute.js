//! This function verifies an auth token before progressing to the next piece of middleware used in index.js/ next()
import jwt from 'jsonwebtoken'
import { secret } from '../config/environment.js'
import User from "../models/user.js"

export default async function secureRoute(req, res, next) {
    try {
        // ! 1) Get the actual token
        const rawToken = req.headers.authorization;
        
        //check token exists
        if (!rawToken) {
            console.log("NOT RAW TOKEN")
        };

        //Remove the word "bearer from token"
        const token = rawToken.replace('Bearer ', '');
        
        // ! 2) Verify the token
        const payload = jwt.verify(token, secret);
        console.log("PAYLOAD: ", payload)

        // ! 3) Reading any info from token before moving on
        const user = await User.findById(payload.userId);

        if (!user) {
            console.log("NOT USER")
        }

        // Make this object available to the next middleware
        res.locals.currentUser = user

        next()
    } catch (err) {
        next(err)
    }
}