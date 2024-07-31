import express from "express";
import { Users } from "../schema/userSchema.js";
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const users = await Users.find();
    if (!users.length) {
      return res.status(400).json({
        msg: "Users is not undifend",
        variant: "warning",
        payload: null,
      });
    }
    res.status(200).json({
      msg: "all user",
      variant: "success",
      payload: users,
    });
  } catch {
    res.status(500).json({
      msg: "Users Server error",
      variant: "error",
      payload: null,
    });
  }
});

router.post("/", async (req, res) => {
  try {
    const user = await Users.create(req.body);
    res.status(201).json({
      msg: "Users is created",
      variant: "success",
      payload: user,
    });
  } catch {
    res.status(500).json({
      msg: "Server error",
      variant: "error",
      payload: null,
    });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await Users.findByIdAndDelete(id);
    res.status(201).json({
      msg: "user is deleted",
      variant: "succes",
      payload: null,
    });
  } catch {
    res.status(500).json({
      msg: "server error",
      variant: "error",
      payload: null,
    });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await Users.findByIdAndUpdate(id, req.body);
    res.status(201).json({
      msg: "user is updete",
      variant: "succes",
      payload: null,
    });
  } catch {
    res.status(500).json({
      msg: "server error",
      variant: "error",
      payload: null,
    });
  }
});

export default router;
