import mongoose from 'mongoose'

const commentSchema = new mongoose.Schema({
    text: { type: String, required: true, maxlength: 200 },
},
    {
        timestamps: true,
    })


const exhibitionSchema = new mongoose.Schema({
    exhibitionTitle: { type: String, required: false },
    artists: { type: String, required: false },
    startDate: { type: String, required: false },
    endDate: { type: String, required: false },
    location: { type: String, required: false },
    museum: { type: String, required: false },
    image: { type: String, required: false },
    movement: { type: String, required: false },
    price: { type: String, required: false },
    recommended: { type: Boolean, default: false },
    comments: [commentSchema],
})

export default mongoose.model('Exhibition', exhibitionSchema)

