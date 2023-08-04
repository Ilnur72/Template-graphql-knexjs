import { readFileSync } from "fs";
import { join } from "path";
import { addUser } from "./add-user.js";
import { listUsers } from "./list-users.js";
import { showUser } from "./show-user.js";
import { editUser } from "./edit-user.js";
import { removeUser } from "./remove-user.js";
import { loginUser } from "./login-user.js";
import { isLoggedIn } from "../../graphql/is-loggedin.js";

const typeDefs = readFileSync(
  join(process.cwd(), "src", "modules", "users", "_schema.gql"),
  "utf8"
);

const resolvers = {
  Query: {
    users: (_, __, contextValue) => {
      isLoggedIn(contextValue);
      return listUsers();
    },
    user: (_, args, contextValue) => {
      isLoggedIn(contextValue);
      return showUser({ id: args.id });
    },
    me: (_, __, contextValue) => {
      console.log(contextValue);
      isLoggedIn(contextValue);
      return showUser({ id: contextValue.user.id });
    },
  },
  Mutation: {
    createUser: async (_, args) => {
      return addUser(args.input);
    },
    updateUser: (_, args, contextValue) => {
      isLoggedIn(contextValue);
      return editUser({ id: args.id, ...args.input });
    },
    removeUser: (_, args, contextValue) => {
      isLoggedIn(contextValue);
      return removeUser({ id: args.id });
    },
    login: (_, args) => {
      return loginUser(args.input);
    },
  },
};

export default { typeDefs, resolvers };
