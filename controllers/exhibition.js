import express from 'express'
import Exhibition from '../models/exhibition.js'


const router = express.Router()

router.get('/', async (req, res, next) => {

    const exhibitions = await Exhibition.find();
    return res.status(200).json(exhibitions)

    console.log(exhibitions)

})


router.post('/', async (req, res, next) => {

    const createExhibition = await Exhibition.create(req.body);
    return res.status(201).json(createExhibition)

})




export default router