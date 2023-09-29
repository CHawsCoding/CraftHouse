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
app.use(express.json());

// Set up Multer middleware for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Specify the destination folder where uploaded files will be stored
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname); // Define the file naming convention
  }
});

const upload = multer({ storage: storage });

// Use the Multer middleware to handle single file uploads
app.use(upload.single('file'));

//serve up static assets
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '')));
  }

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
  });
  

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => {
      const user = authMiddleware({ req }).user;
      return { user };
    },
  });

  const startApolloServer = async () => {
    await server.start();
    server.applyMiddleware({ app });
  };

  startApolloServer();

app.listen(PORT, () => {
    console.log(`🌍 Now listening on http://localhost:${PORT}`);
    console.log(`🚀 GraphQL Playground available at http://localhost:${PORT}${server.graphqlPath}`);
    });

db.once('open', () => {
  console.log('Successfull!');
});
