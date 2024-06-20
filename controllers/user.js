import express from 'express'
import User from '../models/user.js'
import secureRoute from '../middleware/secureRoute.js'

const router = express.Router()

//GET PLANNER
router.get('/:userId', async (req, res, next) => {
    try {
        const { userId } = req.params;
        const userInDb = await User.findById(userId).populate('savedExhibitions')
        if (!userInDb) {
            return res.status(404).json({ message: 'Not Found' })
        }

        userInDb.savedExhibitions.sort((a, b) => {
            const dateA = new Date(a.endDate);
            const dateB = new Date(b.endDate);
            return dateA - dateB;
        });

        return res.status(200).json(userInDb)
    } catch (error) {
        console.log(error)
        res.status(400).send(error)
    }
})

//ADD EXHIBITION TO PLANNER
router.post('/:userId/:exhibitionId', async (req, res, next) => {
    try {
        const { exhibitionId } = req.params;
        const { userId } = req.params;
        const userInDb = await User.findById(userId)
        const exhibInDb = userInDb.savedExhibitions.includes(exhibitionId);
        if (exhibInDb === false) {
            userInDb.savedExhibitions.push(exhibitionId)
            await userInDb.save()
            return res.status(200).json(userInDb)
        } else {
            console.log("This exhibition is already in your planner!")
            return res.status(400).json({ message: "Exhibition already in planner" });
        }
    } catch (error) {
        console.log(error)
        res.status(400).send(error)
    }
})


//DELETE EXHIBITION FROM PLANNER
router.delete('/:userId/:exhibitionId', async (req, res, next) => {
    try {
        const { exhibitionId } = req.params;
        const { userId } = req.params;
        const userInDb = await User.findById(userId)
        userInDb.savedExhibitions.pull(exhibitionId)
        await userInDb.save()
        return res.status(200).json(userInDb)
    } catch (error) {
        console.log(error)
        res.status(400).send(error)
    }
})

export default router
