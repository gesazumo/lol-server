import mongoose from 'mongoose';
const { Schema } = mongoose;

const posts = new Schema({
    title: String,
    name: String,
    body: String,
    // 큐타입 이거 그 머야... enum으로 정의할수잇나?? 자랭, 솔랭, 일반, 칼바람
    queueType: {
        type: String,
        enum: ['solo', 'free']
    },
    createDate: {type: Date, default: Date.now},
});


const PostModel = mongoose.model('posts', posts)

export default PostModel