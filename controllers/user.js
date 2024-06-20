import express from 'express'
import User from '../models/user.js'
import secureRoute from '../middleware/secureRoute.js'

const router = express.Router()

//GET PLANNER
router.get('/:userId', async (req, res, next) => {
    try {
        const { userId } = req.params;
        const userInDb = await User.findById(userId).populate('savedExhibitions')
        return res.status(200).json(userInDb) 
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
})

//ADD EXHIBITION TO PLANNER

router.post('/:userId/:exhibitionId', async (req, res, next) => {

    const { exhibitionId } = req.params;
    const { userId } = req.params;
    const userInDb = await User.findById(userId)
    const exhibInDb = userInDb.savedExhibitions.includes(exhibitionId);
    if (exhibInDb === false) {
    userInDb.savedExhibitions.push(exhibitionId)
    await userInDb.save()
    return res.status(200).json(userInDb)
    } else {
        // console.log("This exhibition is already in your planner!")
        return res.status(400).json({ message: "Exhibition already in planner" });
    }

})


//DELETE EXHIBITION FROM PLANNER

router.delete('/:userId/:exhibitionId', async (req, res, next) => {

    const { exhibitionId } = req.params;
    const { userId } = req.params;
    const userInDb = await User.findById(userId)
    userInDb.savedExhibitions.pull(exhibitionId)
    await userInDb.save()
    return res.status(200).json(userInDb)

})

export default router
