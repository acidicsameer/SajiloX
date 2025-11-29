/* eslint-disable no-undef */
  
   import mongoose  from "mongoose"

  const dbConn= async ()=>{ 
    const url=process.env.MONGOURL
    await mongoose.connect(url)
    try {
console.log("successfully Connected Mongodb")
        
    } catch (error) {
         console.log("error on connection db",error)
    }
    
 } 
 export default dbConn