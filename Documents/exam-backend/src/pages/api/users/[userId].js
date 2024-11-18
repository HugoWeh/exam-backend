import { createRoute } from "@/api/createRoute";
import { UserModel } from "@/models/UserModel";

const handler = createRoute(async (req, res) => {
  const { userId } = req.query;
  const user = await UserModel.findById(userId);

  if (!user) {
    res.status(404).send({ error: "User not found" });

    return;
  }

  if (req.method === "GET") {
    res.send(user);
  }
});

export default handler;
