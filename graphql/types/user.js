export default `
type User {
  id: String!
  username: String!
  password: String!
  eMail: String!
  address: String!
  verified: Boolean!
}
type Query {
  user(id: String!): User
}
type Mutation {

  editUser(
    id: String,
    username: String,
    password: String,
    eMail: String,
    address: String,
    verified: Boolean
    ): User

  deleteUser(
    id: String,
    username: String,
    password: String,
    eMail: String,
    address: String,
    verified: Boolean
    ): User

  register(user: User!): AuthToken,
  login(email: String!, password: String!, confirmPassword: String!): AuthToken
}
`;
