const express = require('express');
const app = express();
const fs = require('fs');
const cors = require('cors');
const blogData = 'blogData.json';

app.use(express.json());

// convert data
const corsConnect = {
    origin: 'http://localhost:3000',
    methods: 'GET , POST',
    preflightCntinue:"false",
    sucessStatus: 204
}
app.use(cors(corsConnect));

// read data
function readBlog(){
    try{
        const data = fs.readFileSync(blogData,"utf-8")
        return JSON.parse(data)
    }
    catch(error){
        return[];
    }
}

// convert data
function writeData(blogdata){
    const data = JSON.stringify(blogdata , null , 2);
    fs.writeFileSync(blogData,data);
}

// post or create
app.post("/data",(req,res)=>{
    const data = readBlog();
    const newdata = req.body;
    data.push(newdata);
    writeData(data)
    res.status(201).json({message:"created sucessfully",newdata})
})

// get data
app.get("/data",(req,res)=>{
    const data = readBlog();
    res.json(data);
})

// server port
app.listen(3001,()=>{
    console.log('http://localhost:3001');
})