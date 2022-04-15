import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  isActivated: { type: Boolean, default: false },
  activationLink: { type: String },
});

const UserModel = mongoose.model("User", UserSchema);

export { UserModel };
