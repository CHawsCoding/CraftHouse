const dotenv = require('dotenv').config();
const express = require('express');
const path = require('path');

const multer = require('multer');

//connect to the database
const db = require('./config/connection');

const { ApolloServer } = require('apollo-server-express');
const app = express();
const PORT = process.env.PORT || 3001;

//import typeDefs and resolvers
const { typeDefs, resolvers } = require('./schemas');
const { authMiddleware } = require('./utils/auth');

app.use(express.urlencoded({ extended: true }));
app.use(express.json({ limit: '5mb' }));

// Set up Multer middleware for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, '../client/public/uploads');
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname); // Use the original filename for the uploaded file
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // set the file size limit to 5 MB
});

// Use the Multer middleware to handle single file uploads
app.use(upload.single('file'));

//serve up static assets
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '')));
  }

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
  });

  //create a new Apollo server and pass in schema data
const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => {
      const user = authMiddleware({ req }).user;
      return { user };
    },
  });

  //integrate Apollo server with Express application as middleware
  const startApolloServer = async () => {
    await server.start();
    server.applyMiddleware({ app });
  };

  //start the Apollo server
  startApolloServer();

app.listen(PORT, () => {
    console.log(`🌍 Now listening on http://localhost:${PORT}`);
    console.log(`🚀 GraphQL Playground available at http://localhost:${PORT}${server.graphqlPath}`);
    });

db.once('open', () => {
  console.log('Successfull!');
});
