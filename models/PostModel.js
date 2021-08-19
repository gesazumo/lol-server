import mongoose from 'mongoose';
const { Schema } = mongoose;

const posts = new Schema({
    title: String,
    author: String,
    body: String,
    createDate: {type: Date, default: Date.now},
});


const PostModel = mongoose.model('posts', posts)

export default PostModel