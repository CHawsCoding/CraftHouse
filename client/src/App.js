import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ApolloProvider, ApolloClient, InMemoryCache, createHttpLink, split } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { WebSocketLink } from '@apollo/client/link/ws'; // Import WebSocketLink
import { getMainDefinition } from '@apollo/client/utilities';

import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Profile from './pages/Profile';
import Create from './pages/Create';
import Explore from './pages/Explore';
import Footer from './components/Footer';
import SearchBar from './components/searchBar';
import DIYDetail from './components/DIYDetail';

const httpLink = createHttpLink({
  uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

// Create a WebSocket link for subscriptions
const wsLink = new WebSocketLink({
  uri: `ws://localhost:${3001}/graphql`,
  options: {
    reconnect: true, // Reconnect to the server in case of connection loss
  },
});

//debugging purposes for websocket link
console.log('WebSocket link:', wsLink);

const wsClient = wsLink.subscriptionClient;
wsClient.onConnected(() => {
  console.log('WebSocket connection opened');
});
wsClient.onDisconnected(() => {
  console.log('WebSocket connection closed');
});
wsClient.onError((error) => {
  console.error('WebSocket error:', error);
});

// Use split to determine whether a request should be made over WebSocket or HTTP
const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  authLink.concat(httpLink)
);

const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache(),
});

const primaryColor = '#000814';

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div style={{ backgroundColor: primaryColor }} className="w-full overflow-hidden text-pink-100">
          <Navbar />
          <SearchBar />
          <Routes>
            <Route path="/" element={<Home primaryColor={primaryColor} />} />
            <Route path="/login" element={<Login primaryColor={primaryColor} />} />
            <Route path="/signup" element={<Signup primaryColor={primaryColor} />} />
            <Route path="/profile" element={<Profile primaryColor={primaryColor} />} />
            <Route path="/Create" element={<Create primaryColor={primaryColor} />} />
            <Route path="/explore" element={<Explore primaryColor={primaryColor} />} />
            <Route path="/diy/:id" element={<DIYDetail primaryColor={primaryColor} />} />
          </Routes>
          <Footer />
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
