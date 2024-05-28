const express=require('express');
const mongoose=require('./config/mongoose');
const todoData=require('./models/contactschema');
const bodyParser=require('body-parser');
const port=8080;
const app=express();
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(express.static("public"));
app.set('view engine','ejs');
app.get('/',function(req,res){
    res.send("I'm in contact list home page");
});
app.get('/contact',(req,res)=>{
    todoData.find()
    .then(result=>{
        res.render('contact',{todo:result});
    })
    .catch(err=>{
           console.log("error while fetching data");
    });
   
});
app.post('/add-task',function(req,res){

    const tddata=new Promise((resolve,reject)=>{
                todoData.create({
                    description:req.body.description,
                    category:req.body.category,
                    date:req.body.date,
                    time:req.body.time,
                })
            .then(newData=>{
                console.log("new data added");
               resolve(newData);
            }).catch(err=>{
                console.log("error in add data",err);
                reject(err);
            });
        });
        tddata.then((newData)=>{
                    res.redirect('/contact');
                }).catch((err)=>{
                    console.log("error",err);
                });
});
app.get('/delete-task/:_id', function(req, res) {
    const tddata=new Promise((resolve,reject)=>{
        todoData.deleteOne(req.params.id)
    .then(Data=>{
       resolve(Data);
    }).catch(err=>{
        console.log("error in add data",err);
        reject(err);
    });
});
tddata.then((Data)=>{
            res.redirect('/contact');
        }).catch((err)=>{
            console.log("error",err);
        });
});
app.listen(port,function(err){
    if(err){
    console.log("error");
    return;
    }
    else
    console.log("server is up and running on:"+port);
});


