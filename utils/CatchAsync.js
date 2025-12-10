 const CatchAsync =(fn)=>{
     return  (req,res,next)=>{
 fn(req,res,next).catch((err=>{
    return res.status(500).json({
        message:err.message,
        Fullerror:err
    })
 }))
     }
 }  
 export default CatchAsync 