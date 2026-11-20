const express=require("express")
const path=require("path")
const app=express()
const port=3000;
const fs=require('fs')

app.use(express.static(path.join(__dirname,'public')))
app.use(express.urlencoded({extended : true}))
app.use(express.json())

app.set('engine view','ejs')

app.get('/',(req,res)=>{
    fs.readdir("./files", (arr,files)=>{
        console.log(files)
        res.render('index.ejs', {files:files})
    });
});
app.post('/create',(req,res)=>{
    fs.writeFileSync(`./files/${req.body.title.split(" ").join("")}.txt`,req.body.details)
    res.redirect("/")
});
app.get('/file/:f',(req,res)=>{
    fs.readFile(`./files/${req.params.f}`,"utf8",(err,fd)=>{
        res.render(`show.ejs`,{fn:req.params.f,fd:fd})
    })
});

app.listen(port, ()=>
    console.log(`The server is running on ${port}`)
);
