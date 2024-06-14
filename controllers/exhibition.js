import express from 'express'
import Exhibition from '../models/exhibition.js'
import secureRoute from '../middleware/secureRoute.js'


const router = express.Router()

//GET GALLERY PAGE
router.get('/', async (req, res, next) => {

    const exhibitions = await Exhibition.find();
    return res.status(200).json(exhibitions)

})

//CREATE EXHIBITION
router.post('/', async (req, res, next) => {

    const createExhibition = await Exhibition.create(req.body);
    return res.status(201).json(createExhibition)

})

//SHOW PAGE
router.get('/gallery/:exhibitionId', async (req, res, next) => {

    const { exhibitionId } = req.params;

    const foundExhibition = await Exhibition.findById(exhibitionId)
 
    return res.status(200).json(foundExhibition);

})

//EDIT EXHIBITION
router.put('/gallery/:exhibitionId', async (req, res, next) => {

    const { exhibitionId } = req.params;

    const updatedExhibition = await Exhibition.findById(exhibitionId)

    Object.assign(updatedExhibition, req.body);

    await updatedExhibition.save()

    return res.status(202).json(updatedExhibition);

})

//DELETE EXHIBITION
router.delete('/gallery/:exhibitionId', async (req, res, next) => {

    const { exhibitionId } = req.params;

    const deletedExhibition = await Exhibition.findById(exhibitionId);

    await deletedExhibition.deleteOne();
    return res.sendStatus(204);

})

export default router