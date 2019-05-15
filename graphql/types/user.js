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

  register(username: String!, email: String!, password: String!, confirmPassword: String!, address: String!): AuthToken,
  login(username: String!, password: String!): AuthToken
}
`;
