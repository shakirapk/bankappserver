// angular l define cheytha database cpy pst cheythu server le dataservice n paranje folder l
database = {
    1000: { acno: 1000, uname: "neer", pswd: 1000, balance: 5000,transaction:[] },
    1001: { acno: 1001, uname: "heer", pswd: 1001, balance: 5000,transaction:[] },
    1002: { acno: 1002, uname: "vyom", pswd: 1002, balance: 5000,transaction:[] },
  }

  //register definition

  const register=(acno, pswd, uname)=> { // nodejs l arrow function use aakkanam

   // js l class illaa so this ozhivaakkuka
    if (acno in database) {
      return {
        statusCode:422,   // already exist client error aann so series 400 thott start aavum
        status:false,
        message:"already exist !!!!! please log in......"
      }
    }
    else {
      database[acno] = {
        acno,
        uname,
        pswd,
        balance: 0,   
        transaction:[]
      }
      console.log(database);
      return {
        statusCode:200,   // success aanenkil status nte series 200 thott strt aavum.
        status:true,
        message:"registered successfully"
      }
    }
  }

// login definition

const login=(acno, pswd)=> {

  if (acno in database) {
    if (pswd == database[acno]["pswd"]) {
      currentAcno=acno 
      currentUname=database[acno]["uname"] 
      return {
        statusCode:200,
        status:true,
        message:"successfully log in...",
        currentAcno,
        currentUname
      }
    }
    else {
      return {
        statusCode:422,
        status:false,
        message:"incorrect password"
      }
    }
  }
  else {
    return {
      statusCode:422,
      status:false,
      message:"user does not exist!!!!"
    }
  }
}


// deposit definition

const deposit=(acno, pswd, amount)=> { // function definition aayond type specify cheyyanm.

  var amt = parseInt(amount)  // type string nn int lekk maattan use aakkiye.

  if (acno in database) {
    if (pswd == database[acno]["pswd"]) {
      database[acno]["balance"] += amt
      database[acno]["transaction"].push({
      amount:amount,
      type:"CREDIT"

})
      return {
          statusCode:200,
          status:true,
          message:amount+"successfully deposited.... and new balance is"+database[acno]["balance"]
      }
    }
    else {
      return {
        statusCode:422,
        status:false,
        message:"incorrect password"
      }
    }
  }
  else {
      return {
      statusCode:422,
      status:false,
      message:"user does not exist!!!"
    }
  }
}



  // method ne export cheyyaan karanam front end l ee cls okke export class l aayirikkum indaaval so athine back end l kittaan vendii.
  module.exports={
      register,
      login,
      deposit
  }