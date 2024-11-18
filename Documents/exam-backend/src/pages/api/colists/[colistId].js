import { createRoute } from "@/api/createRoute";
import { ColistModel } from "@/models/ColistModel";

const handler = createRoute(async (req, res) => {
  const { colistId } = req.query;
  const colist = await ColistModel.findById(colistId);

  if (!colist) {
    res.status(404).send({ error: "Colist not found" });

    return;
  }

  if (req.method === "GET") {
    res.send(colist);
  }

  if (req.method === "PATCH") {
    const { name, description, owner, coAuthors } = req.body;

    Object.assign(colist, {
      name: name || colist.name,
      description: description || colist.description,
      owner: owner || colist.owner,
      coAuthors: coAuthors || colist.coAuthors,
    });

    await colist.save();
    res.send(colist);

    return;
  }

  if (req.method === "DELETE") {
    await colist.deleteOne();
    res.send(colist);
  }
});

export default handler;
