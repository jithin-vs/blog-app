import mongoose, { Schema, model } from "mongoose";

const UserSchema = new Schema({
    email: {
      type: String,
      unique: true,
      required: [true, "Email is required"],
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Email is invalid",
      ],
    },
    password: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: [true, "Name is required"]
    },
    username: {
        type: String,
        required: [true, "username is required"]
      }
  },
);

const  User  =  mongoose.models?.User  || ('User', UserSchema);
export  default  User;