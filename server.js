const express = require("express")
const articleRouter = require('./routes/articles')
const app = express()
const mongoose = require('mongoose')
const Article=require('./models/article')
const methodOverride = require('method-override')
mongoose.connect('mongodb://localhost/blog',{useNewUrlParser:true,UseUnifiedTopology:true})


app.set('view engine' , 'ejs')
app.use(express.urlencoded({extended:false}))
app.use(methodOverride('_method'))

app.get('/',async (req,res)=>{
    const articles = await Article.find().sort({createdAt:-1})
    res.render('articles/index',{articles:articles});
})
app.use('/articles',articleRouter)
app.listen(5000)