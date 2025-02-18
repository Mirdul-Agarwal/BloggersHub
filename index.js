const express = require("express")
const path = require("path");
const userRoute = require("./routes/user")
const mongoose = require("mongoose")

const app = express();
const PORT = 8000;

mongoose.connect('mongodb://127.0.0.1:27017/bloggersHub').then(e =>console.log("MongoDb connected Successfully..!"))



//middlewares
app.set('view engine','ejs')
app.set('views',path.resolve("./views"))
app.use(express.urlencoded({ extended: false}))

//routes
app.get("/",(req,res)=>{
    res.render("home")
})

app.use("/user",userRoute)

app.listen(PORT,()=>console.log(`Server Started at Port: ${PORT}`));