import mongoose from 'mongoose'

const commentSchema = new mongoose.Schema({
    text: { type: String, required: true, maxlength: 200 },
},
    {
        timestamps: true,
    })


const exhibitionSchema = new mongoose.Schema({
    exhibitionTitle: { type: String, required: true },
    artists: { type: String, required: true },
    startDate: { type: String, required: true },
    endDate: { type: String, required: true },
    location: { type: String, required: true },
    museum: { type: String, required: true },
    image: { type: String, required: true },
    movement: { type: String, required: false },
    price: { type: String, required: true },
    recommended: { type: Boolean, default: false },
    comments: [commentSchema],
})

export default mongoose.model('Exhibition', exhibitionSchema)

