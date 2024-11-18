import { UserModel } from "@/models/UserModel";
import { createRoute } from "@/api/createRoute";
import bcrypt from "bcrypt";

const handler = createRoute(async (req, res) => {
  if (req.method === "POST") {
    const { firstName, lastName, email, password } = req.body;

    if (!firstName || !lastName || !email || !password) {
      return res.status(400).send({ message: "All fields are required" });
    }

    try {
      const existingUser = await UserModel.findOne({ email });
      if (existingUser) {
        return res.status(400).send({ message: "Email already in use" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = new UserModel({
        firstName,
        lastName,
        email,
        password: hashedPassword,
      });

      await newUser.save();

      const { password: _, ...userWithoutPassword } = newUser.toObject();

      res.status(201).send(userWithoutPassword);
    } catch (error) {
      console.error("Error saving user:", error);
      res.status(500).send({ message: "Internal Server Error" });
    }
  } else {
    res.status(405).send({ message: "Method Not Allowed" });
  }
});

export default handler;
