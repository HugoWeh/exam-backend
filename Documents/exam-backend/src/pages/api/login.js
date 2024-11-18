import { UserModel } from "@/models/UserModel";
import { createRoute } from "@/api/createRoute";
import bcrypt from "bcrypt";

const handler = createRoute(async (req, res) => {
  if (req.method === "POST") {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).send({ error: "Email and password are required" });
    }

    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(404).send({ error: "User not found" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (passwordMatch) {
      return res.status(200).send({ success: true, userId: user._id });
    } else {
      return res.status(401).send({ error: "Invalid password" });
    }
  } else {
    return res.status(405).send({ error: "Method Not Allowed" });
  }
});

export default handler;
