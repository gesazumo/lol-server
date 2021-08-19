import mongoose from 'mongoose';
const { Schema } = mongoose;

const users = new Schema({
    name: String,
    email: String,
    password: String,
    createDate: {type: Date, default: Date.now},
});


const UserModel = mongoose.model('users', users)

export default UserModel