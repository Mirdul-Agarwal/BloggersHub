const JWT = require("jsonwebtoken");
const secret = "$Backend_Devloper$";

function createTokenForUser(user){
    const payload ={
        _id: user._id,
        email: user.email,
        profileImageURL: user.profileImageURL,
        role: user.role,
    }
    const token = JWT.sign(payload,secret);
    return token;
}

function validateTokenByUser(token){
    const payload = JWT.verify(token,secret);
    return payload;
}

module.exports = {
    createTokenForUser,
    validateTokenByUser,
}