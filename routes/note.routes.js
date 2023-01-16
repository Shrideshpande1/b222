const express = require("express");
const { NoteModel } = require("../models/note.model");

const noteRoute = express.Router();

noteRoute.post("/create", async (req, res, next) => {
  const data = req.body;
  try {
    const note = new NoteModel(data);
    await note.save();
    res.send("note created");
  } catch (error) {
    console.log(error);
    res.send({ error: "Someting went wrong" });
  }
});

noteRoute.get("/", async (req, res, next) => {
  const query = req.query;
  try {
    const note =await NoteModel.find(query);
    res.send(note);
  } catch (error) {
    console.log(error);
    res.send({ error: "Someting went wrong" });
  }
});

noteRoute.patch("/update/:id", async (req, res, next) => {
  const ID=req.params.id;
  const payload=req.body;
  try {
    await NoteModel.findByIdAndUpdate({_id:ID},payload);
    res.send("note updated successfully");
  } catch (error) {
    console.log(error);
    res.send({ error: "Someting went wrong" });
  }
});
noteRoute.delete("/delete/:id", async (req, res, next) => {
  const ID=req.params.id;

  try {
    await NoteModel.findByIdAndDelete({_id:ID});
    res.send("note Deleted successfully");
  } catch (error) {
    console.log(error);
    res.send({ error: "Someting went wrong" });
  }
});


module.exports={noteRoute}
