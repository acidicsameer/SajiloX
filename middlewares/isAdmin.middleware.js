 const isAdmin = (...roles) => {
   return (req,res,next)=>{
     const userRole=req.user.role  
  console.log("USER ROLE:", userRole);
     if(!roles.includes(userRole)){
        res.status(403).json({
             "message":"you dont have permission . Only admin can access it "
        }) 
     }  
     else{
         next()
     }
   }
 
};
 
export default isAdmin  