import mongoose from 'mongoose'

const commentSchema = new mongoose.Schema({
    text: { type: String, required: true, maxlength: 200 },
},
    {
        timestamps: true,
    })


const exhibitionSchema = new mongoose.Schema({
    exhibitionTitle: { type: String, required: true, minlength: 2 },
    artists: { type: String, required: true, minlength: 2 },
    startDate: { type: String, required: true, minlength: 2 },
    endDate: { type: String, required: true, minlength: 2 },
    location: { type: String, required: true, minlength: 2 },
    museum: { type: String, required: true, minlength: 2 },
    image: { type: String, required: true, minlength: 2 },
    movement: { type: String, required: true, minlength: 2 },
    price: { type: String, required: true, minlength: 2 },
    recommended: { type: Boolean, default: true },
    description: { type: String, required: true, minlength: 2 },
    comments: [commentSchema],
})

export default mongoose.model('Exhibition', exhibitionSchema)

