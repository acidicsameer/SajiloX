/* eslint-disable no-undef */
import express from "express";
import dotenv from "dotenv";
import dbConn from "./database/dbConn.js";
import ProductRoute from "./Routes/Product.Route.js";
import AuthRoute from "./Routes/UserAuth.route.js";

dotenv.config(); 

const app = express();
app.use(express.json());  // json  handle  garna 
app.use(express.static("./uploads")) // telling node to access uploads folder 

app.use(express.urlencoded({ extended: true })); // formdata handle garna 

const port = process.env.PORT

app.use("",AuthRoute) 
app.use("",ProductRoute) 

 


app.listen(port, () => {
  console.log("Server started successfully");
  dbConn();
});
