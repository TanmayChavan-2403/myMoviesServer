const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true,
        unique: true
    }, 
    password:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: false
    }
})

userSchema.statics.login = async function(username, password){
    const user = await this.findOne({username: username});
    if (user){
        if (password === user.password){
            return user._id;
        } else {
            throw Error('Incorrect password');
        }
    } else {
        throw Error('User does not exits');
    }
}

const User = mongoose.model('userData', userSchema, 'userData')
module.exports = User;