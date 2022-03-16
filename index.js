// import xpress
const express=require('express')

// back end le data.service.js n ille fldr import cheythu
const dataService=require('./services/data.service')

// create an app using  express

const app=express()

// to parse json
app.use(express.json())

// resolve http request from client
// GET :- server n data read cheyyaan
app.get('/',(req,res)=>{     //localhost:3000 aann / kond udheshikkunnath
    res.send("IT'S A GET METHOD");  //ith response aann browser l kaanikkunne.

    // res.status(401).send("IT'S A GET METHOD");  // generally status 200 series l aann start aaval , 
    //athil status nammakk ishtullath kodukkaan vendiii 
})

// Browser l get method l kodutheth maatre visible aavuu
//bakki ille http request kittaan vendii aa methods ne thunder client l kodukkanam


// POST :- Puthiyathaayitt changes or creation nadathaan vendii
app.post('/',(req,res)=>{     //localhost:3000 aann / kond udheshikkunnath
    res.send("IT'S A POST METHOD"); 
})

// PUT :- server n data update cheyyaan
app.put('/',(req,res)=>{     //localhost:3000 aann / kond udheshikkunnath
    res.send("IT'S A PUT METHOD");  //ith response aann browser l kaanikkunne.
})

// PATCH :- server n data partially update cheyyaan
app.patch('/',(req,res)=>{     //localhost:3000 aann / kond udheshikkunnath
    res.send("IT'S A PATCH METHOD");  //ith response aann browser l kaanikkunne.
})

// DELETE :- server n data delete cheyyaan
app.delete('/',(req,res)=>{     //localhost:3000 aann / kond udheshikkunnath
    res.send("IT'S A DELETE METHOD");  //ith response aann browser l kaanikkunne.
})

// set up the port number
app.listen(3000,()=>{
    console.log("server started at port no:3000");
})



// BANK APP -API

// REGISTER APT 

app.post('/register',(req,res)=>{    //ith call back function aann athayath oru function nte ullil vere oru function define cheythath.

    const result=dataService.register(req.body.acno,req.body.pswd,req.body.uname)
    res.status(result.statusCode).json(result)
})

// LOGIN APT 

app.post('/login',(req,res)=>{    //ith call back function aann athayath oru function nte ullil vere oru function define cheythath.

    const result=dataService.login(req.body.acno,req.body.pswd)
    res.status(result.statusCode).json(result)
})

// DEPOSIT APT 

app.post('/deposit',(req,res)=>{    //ith call back function aann athayath oru function nte ullil vere oru function define cheythath.

    const result=dataService.deposit(req.body.acno,req.body.pswd,req.body.amount)
    res.status(result.statusCode).json(result)
})
