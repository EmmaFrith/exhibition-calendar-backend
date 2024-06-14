import mongoose from 'mongoose'
import mongooseUniqueValidator from 'mongoose-unique-validator'

const userSchema = new mongoose.Schema({
    firstName: { type: String, required: false },
    lastName: { type: String, required: false },
    location: { type: String, required: false },
    username: { type: String, unique: true, maxlength: 50, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, default: false },
    savedExhibitions: [{
        type: mongoose.Schema.ObjectId,
        ref: 'Exhibition',
    }],
})

userSchema.plugin(mongooseUniqueValidator)

export default mongoose.model('User', userSchema)