/* eslint-disable no-undef */
import express from "express";
import dotenv from "dotenv";
import dbConn from "./database/dbConn.js";
import router from "./Routes/UserAuth.route.js";
dotenv.config(); 

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port = process.env.PORT

app.use("",router)


app.listen(port, () => {
  console.log("Server started successfully");
  dbConn();
});
