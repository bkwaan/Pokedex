const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        type:String,
        required: true
    },
    emaile: {
        type: String,
        required:true,
        unique:true
    },
    password: {
        type: String,
        required: true
    }
});

module.exportrs = User = mongoose.model('user',UserSchema);