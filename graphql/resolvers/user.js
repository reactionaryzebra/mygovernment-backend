import User from "../../models/User";
import bcrypt from 'bcryptjs'

export default {
  Query: {
    user: async (root, args) => {
      try {
        const foundUser = await User.findOne(args);
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
          message: '',
          address: ''
        }
        const foundUser = await User.findOne({username: args.username})
        if (foundUser) {
          authToken.message = 'This Username is already taken'
        } else {
          if (args.password === args.confirmPassword){
            bcrypt.hashSync(args.password, bcrypt.genSaltSync(10))
            const newUser = await User.create({args})
            authToken.logged = true
            authToken.address = args.address
          }
        }
        return authToken
      } catch (err) {
        throw new Error(err)
      }
    }
  }
};
