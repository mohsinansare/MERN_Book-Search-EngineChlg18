import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import path from 'path';
import { fileURLToPath } from 'url';
// @ts-ignore
import db from './config/connection.js';
// filepath: C:\Computer Programming\first-day\FSF-PT-EAST-NOVEMBER-110424\18-MERN-and-Authentication\02-Challenge\Develop\server\server.js
import connection from './config/connection.js'; // Adjust path if needed

// Define typeDefs and resolvers directly in this file
const typeDefs = `#graphql
  type Query { typeDefs: String }
  type Mutation { mutation: String }
`;

const resolvers = {
  Query: {
    typeDefs: () => 'Hello from Query!',
  },
  Mutation: {
    mutation: () => 'Hello from Mutation!',
  },
};

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve static files in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(path.dirname(fileURLToPath(import.meta.url)), '../client/build')));
}

app.get('/', (_, res) => {
  res.sendFile(path.join(path.dirname(fileURLToPath(import.meta.url)), '../client/build/index.html'));
});

// Set up Apollo Server
const startApolloServer = async () => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => ({ req }),
  });

  await server.start();
  // @ts-ignore
  server.applyMiddleware({ app });

  // Ensure the database connection is established before starting the server
  db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      console.log(`GraphQL endpoint available at http://localhost:${PORT}${server.graphqlPath}`);
    });
  });
};

startApolloServer();