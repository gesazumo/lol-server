import mongoose from 'mongoose';
import { ADD_FRIEND_TIME_LIST, POSITION, QUEUE_TYPE } from '../constant.js';
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
    positionType: {
        type: String,
        enum: POSITION,
        default: 'none'
    },
    addFriendTime: {
        type: String,
        enum: ADD_FRIEND_TIME_LIST
    },
    voice: {
        type: Boolean,
        default: true
    },
    createDate: {type: Date, default: Date.now},
});


const PostModel = mongoose.model('posts', posts)

export default PostModel