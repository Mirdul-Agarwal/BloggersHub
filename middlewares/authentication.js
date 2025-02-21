const { validateTokenByUser } = require("../services/authentication")

function checkForAuthenicationCookie(cookieName){
    return (req,res,next)=>{
        const tokenCookieValue = req.cookies[cookieName];
        if(!tokenCookieValue){
            return next();
        }
        try {
            const userPayload = validateTokenByUser(tokenCookieValue);
            req.user = userPayload;
        } catch (error) {}
        return next();

    }

}
module.exports = {
    checkForAuthenicationCookie,
}