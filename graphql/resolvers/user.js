import User from "../../models/User";

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
    addUser: async (root, args) => {
      try {
        const createdUser = await User.create(args);
        return createdUser;
      } catch (err) {
        throw new Error(err);
      }
    },
    editUser: async (root, args) => {
      try {
        const updatedUser = await User.findOneAndUpdate({ id: args.id }, args);
      } catch (err) {
        throw new Error(err);
      }
    },
    deleteUser: async (root, args) => {
      try {
        const deletedUser = await User.findOneAndDelete(args);
      } catch (err) {
        throw new Error(err);
      }
    }
  }
};
