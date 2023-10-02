import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

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

import { ApolloProvider, ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

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

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

// Define primary color for use in components
const primaryColor = '#000814';

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div style={{ backgroundColor: primaryColor }} className="w-full overflow-hidden text-pink-100">
          <Navbar />
          <SearchBar />
          <Routes>
            {/* Passing the primaryColor prop to components */}
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
