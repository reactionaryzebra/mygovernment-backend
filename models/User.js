import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  eMail: { type: String, required: true },
  address: { type: String, required: true },
  verified: { type: Boolean, default: false }
});

userSchema.methods.hashPassword = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};

userSchema.methods.validatePassword = function(password) {
  return bcrypt.compareSync(password, this.password);
};

userSchema.pre("save", function(next) {
  if (this.isModified("password")) {
    this.password = this.hashPassword(this.password);
  }
  next();
});

const User = mongoose.model("User", userSchema);

export default User;
