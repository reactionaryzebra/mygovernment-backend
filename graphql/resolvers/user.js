import User from "../../models/User";
import bcrypt from "bcryptjs";

export default {
  Query: {
    user: async (root, args) => {
      try {
        const foundUser = await User.findById(args.id);
        return foundUser
      } catch (err) {
        throw new Error(err);
      }
    }
  },
  Mutation: {
    editUser: async (root, args) => {
      try {
        const updatedUser = await User.findByIdAndUpdate(args.id, args, {
          new: true
        });
        return updatedUser;
      } catch (err) {
        throw new Error(err);
      }
    },
    deleteUser: async (root, args) => {
      try {
        const deletedUser = await User.findByIdAndDelete(args.id);
        return deletedUser;
      } catch (err) {
        throw new Error(err);
      }
    },
    register: async (root, args) => {
      try {
        const authToken = {
          logged: false,
          message: "",
          address: ""
        };
        const foundUser = await User.findOne({ username: args.username });
        if (foundUser) {
          authToken.message = "This Username is already taken";
        } else {
          if (args.password === args.confirmPassword) {
            const newUser = await User.create({
              username: args.username,
              password: args.password,
              eMail: args.email,
              address: args.address
            });
            authToken.logged = true;
            authToken.user = newUser;
          } else {
            authToken.message = "Passwords do not match";
          }
        }
        return authToken;
      } catch (err) {
        throw new Error(err);
      }
    },
    login: async (root, args) => {
      try {
        const authToken = {
          logged: false,
          message: "",
          address: ""
        };
        const foundUser = await User.findOne({ username: args.username });
        if (foundUser) {
          const success = await foundUser.validatePassword(args.password);
          if (success) {
            authToken.logged = true;
            authToken.user = foundUser;
          } else {
            authToken.message = "Incorrect password";
          }
        } else {
          authToken.message = "This username does not exist";
        }
        return authToken;
      } catch (err) {
        throw new Error(err);
      }
    }
  }
};
