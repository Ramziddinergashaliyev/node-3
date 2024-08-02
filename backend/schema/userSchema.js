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
    required: false,
    default: "",
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
    required: false,
    default: "",
  },
  budget: {
    type: Number,
    required: true,
  },
});

export const Users = mongoose.model("user", userSchema);

export const validationBlog = (body) => {
  let schema = Joi.object({
    fname: Joi.string().required(),
    lname: Joi.string().required(),
    username: Joi.string().required().min(6).max(30),
    password: Joi.string().required().min(6).max(30),
    url: Joi.string().required(),
    age: Joi.number().required(),
    gender: Joi.string().required(),
    isActive: Joi.boolean().required(),
    budget: Joi.number().required(),
  });
  return schema.validate(body);
};
