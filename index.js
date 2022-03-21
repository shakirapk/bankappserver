// import xpress
const express=require('express')
const jsonwebtoken = require('jsonwebtoken')

// back end le data.service.js n ille fldr import cheythu
const dataService=require('./services/data.service')

// jsonwebtoken import cheyyanam
const jwt=require('jsonwebtoken')
const res = require('express/lib/response')

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


// APPLICATION SPECIFIC MIDDLEWARE

const appMiddleware=(req,res,next)=>{
    console.log("application specific middleware");
    next()   // next() use aakkiyaal maatre next kodukkunna request execute cheyyuuu
}
app.use(appMiddleware)

// BANK APP -API


// to verify token - middleware (ROUTER SPECIFIC MIDDLEWARE)

const jwtMiddleware=(req,res,next)=>{

    try{

// step:1 - request nn token eduthitt middleware le oru variable athine assign cheyyanam,ee token request nte body laann indaaval
// const token=req.body.token
// ee token n parayunneth okke authorize cheyyunna kaaryangal aann so athokke request head l keep cheyyandaa saadhanangal aann so athine request nte head portion l kodukkaan vendii
// aa token nte name matram cpy cheyuka ennitt headers n ille section l oru name "x-access-token" kodukkuka then value nte place l a token pste cheyyuka.then aa name "x-access-token"
//eduthitt middleware le oru variable athine assign cheyyanam,ee token request nte header laann indaaval
const token=req.headers["x-access-token"]
// step:2 - now ee token verify cheyyanam athinaayitt jsonwebtoken n paranje library import cheyyanam.
const data=jwt.verify(token,"supersecretkey")
req.currentAcno=data.currentAcno
next()
// ennitt ee jwtMiddleware ne ethokke request laanno vende avide okke place cheyyuka

}
catch{
    res.status(422).json({
        statusCode:422,
        status:false,
        message:"please log in..."
    })
}
}


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

app.post('/deposit',jwtMiddleware,(req,res)=>{    //ith call back function aann athayath oru function nte ullil vere oru function define cheythath.

    const result=dataService.deposit(req.body.acno,req.body.pswd,req.body.amount)
    res.status(result.statusCode).json(result)
})


// WITHDRAW API

app.post('/withdraw',jwtMiddleware,(req,res)=>{    //ith call back function aann athayath oru function nte ullil vere oru function define cheythath.

    const result=dataService.withdraw(req.body.acno,req.body.pswd,req.body.amount)
    res.status(result.statusCode).json(result)
})

// TRANSACTION HISTORY API

app.post('/transaction',jwtMiddleware,(req,res)=>{    //ith call back function aann athayath oru function nte ullil vere oru function define cheythath.

    const result=dataService.getTransaction(req.body.acno)
    res.status(result.statusCode).json(result)
})

