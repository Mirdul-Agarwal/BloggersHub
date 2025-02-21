const express = require("express")
const path = require("path");
const userRoute = require("./routes/user")
const blogRoute = require("./routes/blog")
const mongoose = require("mongoose")
const cookieParser = require("cookie-parser");
const Blog = require("./models/blog")
const { checkForAuthenicationCookie } = require("./middlewares/authentication");

const app = express();
const PORT = 8000;

mongoose.connect('mongodb://127.0.0.1:27017/bloggersHub').then(e =>console.log("MongoDb connected Successfully..!"))



//middlewares
app.set('view engine','ejs')
app.set('views',path.resolve("./views"))
app.use(express.urlencoded({ extended: false}))
app.use(cookieParser());
app.use(checkForAuthenicationCookie("token"));
app.use(express.static(path.resolve("./public")))

//routes
app.get("/",async(req,res)=>{
    const allBlogs = await Blog.find({});
    res.render("home",{
        user: req.user,
        blogs: allBlogs,
    })
})

app.use("/user",userRoute)
app.use("/blog",blogRoute)

app.listen(PORT,()=>console.log(`Server Started at Port: ${PORT}`));