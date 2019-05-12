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
    }
  }
};
