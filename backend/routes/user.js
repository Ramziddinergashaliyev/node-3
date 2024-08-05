import express from "express";
import { Users, validationBlog } from "../schema/userSchema.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { auth } from "../middleware/auth.js";
dotenv.config();
const router = express.Router();

router.get("/", auth, async (req, res) => {
  try {
    const { limit = 20, skip = 1 } = req.query;
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
      total,
    });
  } catch {
    res.status(500).json({
      msg: "Users Server error",
      variant: "error",
      payload: null,
    });
  }
});

router.post("/sign-up", async (req, res) => {
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

    req.body.password = await bcrypt.hash(req.body.password, 10);

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

router.post("/sign-in", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await Users.findOne({ username });

    if (!user) {
      return res.status(400).json({
        msg: "username xato",
        variant: "succes",
        payload: user,
      });
    }

    bcrypt.compare(password, user.password, function (err, response) {
      const token = jwt.sign(
        { _id: user._id, role: "admin" },
        process.env.SECRET_KEY
      );
      if (response) {
        return res.status(200).json({
          msg: "Log in",
          variant: "succes",
          payload: { user, token },
        });
      } else {
        return res.status(400).json({
          msg: "password xato",
          variant: "error",
          payload: null,
        });
      }
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
