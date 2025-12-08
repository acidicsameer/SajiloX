import User from "./models/User.model.js";
import bcrypt from "bcryptjs";

const adminSeeder = async () => {
  const UserFound = await User.findOne({
    UserEmail: "acidicsameer008@gmail.com",
  });

  if (!UserFound) {

    await User.create({
      UserName: "admin",
      UserEmail: "acidicsameer008@gmail.com",
      UserPhoneNumber: "9807409596",
      UserPassword: await  bcrypt.hash("admin",10),
      Role: "Admin",
    });
    console.log("Successfully seeded admin");
  } else {
    console.log("admin already seeeded");
  }
};
export default adminSeeder;
