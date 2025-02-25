const { Router } = require("express")
const User = require("../models/user")

const router = Router();
//login
router.get("/signin",(req,res)=>{
    return res.render("signin");
})
//singup 
router.get("/signup",(req,res)=>{
    return res.render("signup");
})
//user signin
router.post("/signin",async(req,res)=>{
   const { email, password } = req.body;
   try {
    const token =  await User.matchPasswordAndGenrateToken(email, password);
    return res.cookie('token',token).redirect("/");
    
   } catch (error) {
    return res.render("signin",{
        error: "Incorrect Credentials",
    });
    
   }
})
//logout
router.get("/logout",(req,res)=>{
    res.clearCookie('token').redirect("/");
})


// user signup 
router.post("/signup",async(req,res)=>{
    const { fullName, email, password } = req.body;
    await User.create({
        fullName,
        email,
        password,
    });
    return res.redirect("/");
})





module.exports = router; 
