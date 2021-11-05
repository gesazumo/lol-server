import mongoose from 'mongoose';
const { Schema } = mongoose;

const boards = new Schema({
    title: {type : String, required: true},
    writer: {type : String, required: true},
    body: {type : String, required: true},
    like: {type: Number, required: true, default: 0},
    createDate: {type: Date, default: Date.now},
});


const BoardModel = mongoose.model('boards', boards)

export default BoardModel