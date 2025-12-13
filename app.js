/* eslint-disable no-undef */
import express from "express";
import dotenv from "dotenv";
import dbConn from "./database/dbConn.js";

import AuthRoute from "./Routes/auth/UserAuth.route.js";
import ProductRoute from "./Routes/admin/Product.Route.js";
import ReviewRoute from "./Routes/user/Review.Route.js";
import AdminUserRoute from "./Routes/admin/adminUsers.route.js";
import UserProfileRoute from "./Routes/user/User.route.js";
dotenv.config();

const app = express();
app.use(express.json()); // json  handle  garna
app.use(express.static("./uploads")); // telling node to access uploads folder

app.use(express.urlencoded({ extended: true })); // formdata handle garna

const port = process.env.PORT;

app.use("/auth", AuthRoute);
app.use("", ProductRoute);
app.use("", ReviewRoute);
app.use("/admin", AdminUserRoute);
app.use("", UserProfileRoute);

app.listen(port, () => {
  console.log("Server started successfully");
  dbConn();
});
