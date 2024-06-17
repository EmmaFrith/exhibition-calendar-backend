import express from 'express'
import User from '../models/user.js'
import secureRoute from '../middleware/secureRoute.js'

const router = express.Router()


//GET PLANNER

router.get('/:userId', secureRoute, async (req, res, next) => {

    const currentUser = res.locals.currentUser
    const userInDb = await User.findById(currentUser).populate('savedExhibitions')
    console.log(userInDb.savedExhibitions)
    return res.status(200)

})

//ADD EXHIBITION TO PLANNER

router.post('/:userId/:exhibitionId', secureRoute, async (req, res, next) => {

    const { exhibitionId } = req.params;
    const currentUser = res.locals.currentUser
    const userInDb = await User.findById(currentUser)
    userInDb.savedExhibitions.push(exhibitionId)
    await userInDb.save()
    return res.status(200).json(userInDb)

})


//DELETE EXHIBITION FROM PLANNER


export default router
