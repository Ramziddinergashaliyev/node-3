import Joi from "joi";
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  fname: {
    type: String,
    required: true,
  },
  lname: {
    type: String,
    required: false,
    default: "",
  },
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  url: {
    type: String,
    required: false,
    default: "",
  },
  gender: {
    type: String,
    required: true,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  budget: {
    type: Number,
    default: 0,
  },
  role: {
    type: String,
    required: false,
    default: "user",
  },
});

export const Users = mongoose.model("user", userSchema);

export const validationBlog = (body) => {
  let schema = Joi.object({
    fname: Joi.string().required(),
    lname: Joi.string().allow(""),
    username: Joi.string().required().min(6).max(30),
    password: Joi.string().required().min(6).max(30),
    url: Joi.string().allow(""),
    age: Joi.number().required(),
    gender: Joi.string().required(),
    isActive: Joi.boolean().allow(true),
    budget: Joi.number().allow(0),
    role: Joi.string().allow("user"),
  });
  return schema.validate(body);
};
