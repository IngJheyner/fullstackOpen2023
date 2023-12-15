import mongoose from "mongoose"

const blogSchema = new mongoose.Schema({
    url: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    author: String,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    likes: { type: Number, default: 0 }
})

blogSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject.__v
        delete returnedObject._id

    }
})

export default mongoose.model('Blog', blogSchema)