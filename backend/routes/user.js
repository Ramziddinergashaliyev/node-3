import express from "express";
import { Users, validationBlog } from "../schema/userSchema.js";
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const { limit = 2, skip = 1 } = req.query;
    const users = await Users.find()
      .limit(limit)
      .skip((skip - 1) * limit);
    if (!users.length) {
      return res.status(400).json({
        msg: "Users is not undifend",
        variant: "warning",
        payload: null,
      });
    }
    let total = await Users.countDocuments();
    res.status(200).json({
      msg: "all user",
      variant: "success",
      payload: users,
      total: Math.ceil(total / limit),
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
    let { error } = validationBlog(req.body);
    if (error) {
      return res.status(400).json({
        msg: error.details[0].message,
        variant: "error",
        payload: null,
      });
    }

    const exist = await Users.exists({ username: req.body.username });
    if (exist) {
      return res.status(400).json({
        msg: "username mavjud",
        variant: "error",
        payload: null,
      });
    }
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
