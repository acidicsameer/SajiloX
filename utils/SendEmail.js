/* eslint-disable no-undef */


 import nodemailer from "nodemailer" 
  import dotenv from 'dotenv' 
  dotenv.config([])
const SendEmail=async(data)=>{
 const transporter=nodemailer.createTransport(
    {
        service:'gmail',
        auth:{
             user:"acidicsameer008@gmail.com",
             pass:process.env.APP_PASS

        }
    } )
     
     await transporter.sendMail({
         from :"SajiloX<acidicsameer008@gmail.com>", 
         to:data.email,
         subject:data.subject,
         text:data.text
    })
 
} 
export default SendEmail