const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const {Schema} = mongoose;

const userSchema = new Schema({
    firstName: {
        type: String,
        requuire: true,
        min: 3,
        max: 16,

    },
    lastName: {
        type: String,
        require: true,
        min: 3,
        max: 8,
    },
    emailId: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
        min: 8,
    },
    age: {
        type: Number,
        min: 18,
    },
    gender:{
        type: String,
        validate(value){
            if(!["male","female","others"].includes(value)){
                throw new Error("Invalid gender type");
            }
    }
},
    skills:{ type: [String],
    },
    about:{
        type:String,
        default:"lets code together",
    },
},{timestamps: true}
);

userSchema.methods.getJWT = async function (){
    const user = this;
    const token = await jwt.sign({_id: user._id}, "DevMatchSecretKey", {expiresIn: "7d"});
    return token;
};

userSchema.methods.validatePassword = async function (passwordEntered){
    const user = this;
    const passwordHash = user.password;
    const isValidPassword = await bcrypt.compare(passwordEntered, passwordHash);
    return isValidPassword;
}


module.exports = mongoose.model('User', userSchema);