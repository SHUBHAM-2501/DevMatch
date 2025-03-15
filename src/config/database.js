const mongoose = require('mongoose');

const connectDB = async () => {
        await mongoose.connect("mongodb+srv://shubhamNodejs:feYbgfX7Yb5MwSUE@nodejs.klp3v.mongodb.net/?retryWrites=true&w=majority&appName=Nodejs/devMatch");
};

module.exports = connectDB;