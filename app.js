/* eslint-disable no-undef */
import express from "express";
import dotenv from "dotenv";
import dbConn from "./database/dbConn.js";
import { Server } from "socket.io";
import ProductRoute from "./Routes/admin/Product.Route.js";
import ReviewRoute from "./Routes/user/Review.Route.js";
import AdminUserRoute from "./Routes/admin/adminUsers.route.js";
import UserProfileRoute from "./Routes/user/UserProfile.route.js";
import CartRoute from "./Routes/user/Cart.route.js";
import OrderRoute from "./Routes/user/Order.route.js";
import AdminOrderRoute from "./Routes/admin/order.route.js";
import UserAuthRoute from "./Routes/auth/UserAuth.route.js";
import PaymentRoute from "./Routes/user/payment.route.js";
import cors from "cors";

dotenv.config();

const app = express();
app.use(express.json()); // json  handle  garna
app.use("/uploads", express.static("uploads")); // telling node to access uploads folder

app.use(express.urlencoded({ extended: true })); // formdata handle garna

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);
const port = process.env.PORT;

app.use("", UserAuthRoute);
app.use("", ProductRoute);
app.use("", ReviewRoute);
app.use("/admin", AdminUserRoute);
app.use("/admin", AdminOrderRoute);
app.use("", UserProfileRoute);
app.use("", CartRoute);
app.use("", OrderRoute);
app.use("/api/payment", PaymentRoute);

const server = app.listen(port, () => {
  console.log("Server started successfully");
  dbConn();
});
const io = new Server(server);
// // When a client connects
// io.on('connection', (socket) => {
//   console.log('A user connected');
//   console.log(socket.id)
//   socket.on("hello",(data)=>{
//     console.log(data)
//   })
// })
export const getSocketIo = () => {
  return io;
};
