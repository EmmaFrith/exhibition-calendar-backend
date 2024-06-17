import express from 'express'
import User from '../models/user.js'
import secureRoute from '../middleware/secureRoute.js'

const router = express.Router()


//GET PLANNER

router.get('/:userId', secureRoute, async (req, res, next) => {

    const currentUser = res.locals.currentUser
    const userInDb = await User.findById(currentUser)
    console.log(userInDb)
    return res.status(200)

})

//ADD EXHIBITION TO PLANNER


//DELETE EXHIBITION FROM PLANNER


export default router
