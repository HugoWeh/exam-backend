import { ColistModel } from "@/models/ColistModel";
import { createRoute } from "@/api/createRoute";

const handler = createRoute(async (req, res) => {
  if (req.method === "GET") {
    const { name } = req.query;
    const colists = await ColistModel.find(name ? { name } : {});

    res.send(colists);

    return;
  }

  if (req.method === "POST") {
    const { name, description, owner, coAuthors } = req.body;
    const newColist = new ColistModel({ name, description, owner, coAuthors });

    await newColist.save();

    res.send(newColist);
  }
});

export default handler;
