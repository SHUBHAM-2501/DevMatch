const validator = require('validator');

const validateSignUpData = (req) => {
    const { firstName, lastName, emailId, password} = req.body;
    if (!firstName || !lastName || !emailId || !password) {
        throw new Error("All fields are mandatory");    
    }
    else if(!validator.isEmail(emailId)){
        throw new Error("Invalid email");
    } 
    else if(!validator.isStrongPassword(password)){
        throw new Error("Password is not strong");
    }
};

const validateProfileEdits = (req)=>{
    const allowedFields = ["firstName","lastName","about","age","skills"];
    const isAllowedField = Object.keys(req.body).every((field) =>
    allowedFields.includes(field));

    return isAllowedField;
};

module.exports = { validateSignUpData , validateProfileEdits, };