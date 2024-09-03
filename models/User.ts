import mongoose, { model, Document, Schema, Types } from "mongoose";

export interface IUser extends Document {
  email: string;
  password: string;
  name: string;
  profilePic: string;
}

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
    required: true,
  },
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  profilePic: {
    type: String,
    default: "",
  },
});

const User = mongoose.models.User || model("User", UserSchema);
export default User;
