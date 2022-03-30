import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import { buildSchema } from 'graphql';
interface IUser {
  _id : string;
  name : string;
  email :string;
  active : boolean;
}
const User : IUser[] = [
  {
    _id : 'db631494-e81e-48d0-bd4e-94bd24fec2b1',
    name : 'Keven1',
    email : 'kevenmario.n.r@gmail.com',
    active : true
  },
  {
    _id : 'db631494-e81e-48d0-bd4e-94bd24fec2b1',
    name : 'Keven2',
    email : 'kevenmario.n.r2@gmail.com',
    active : true
  },
  {
    _id : 'db631494-e81e-48d0-bd4e-94bd24fec2b1',
    name : 'Keven3',
    email : 'kevenmario.n.r3@gmail.com',
    active : true
  }
];
const schemas = buildSchema(`
  type User {
    _id : ID!
    name : String!,
    email : String!,
    active : Boolean!
  }

  type Post {
    _id : ID!
    title : String!
    content : String!
    author : User!
  }

  type Query {
    hello : String,
    users : [User!]!
    getUserByEmail(email : String!) : User!
  }
  
  type Mutation {
    createUser(name : String!, email: String!) : User!
  }

`);

const resolvers = {
    hello : () => {
      return 'Hello World'
    },
    users : () => {
      return User
    },
    getUserByEmail : (args : IUser) => User.find((user) => user.email === args.email),
    createUser : (args : Omit<IUser,"_id" | 'active'>) => {
      const newUser : IUser = {
        _id : Math.round(89*93).toString(),
        active : true,
        email : args.email,
        name : args.name
      }
      User.push(newUser);
      return newUser;
    }
};

const app = express();
app.use('/graphql',graphqlHTTP({
  schema : schemas,
  rootValue : resolvers,
  graphiql : true,
}));

app.listen(4000,() => console.log('🔥 Server started at http://localhost:4000/graphql'));