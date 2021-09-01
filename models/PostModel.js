import mongoose from 'mongoose';
import { POSITION, QUEUE_TYPE } from '../constant.js';
const { Schema } = mongoose;

const posts = new Schema({
    title: {type : String, required: true},
    name: {type : String, required: true},
    body: {type : String, required: true},
    queueType: {
        type: String,
        enum: QUEUE_TYPE,
        required: true
    },
    recruitPosition: {
        type: String,
        enum: POSITION,
        default: 'none'
    },
    voice: {
        type: Boolean,
        default: true
    },
    createDate: {type: Date, default: Date.now},
});


const PostModel = mongoose.model('posts', posts)

export default PostModel