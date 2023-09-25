import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { Link } from 'react-router-dom';

import { LOGIN_USER } from '../utils/mutations';
import Auth from '../utils/auth';

function Login() {
  const [formState, setFormState] = useState({ email: '', password: '' });
  const [login, { error }] = useMutation(LOGIN_USER);

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    try {
      const { data } = await login({
        variables: { ...formState },
      });

      Auth.login(data.login.token);
    } catch (err) {
      console.error(err);
    }

    setFormState({
      email: '',
      password: '',
    });
  };

  return (
    <div className="w-full max-w-md mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-4">Login</h2>
      <form onSubmit={handleFormSubmit}>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 font-bold mb-2">
            Email:
          </label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Your email"
            onChange={handleInputChange}
            value={formState.email}
            required
            className="text-black w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-gray-700 font-bold mb-2">
            Password:
          </label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="******"
            onChange={handleInputChange}
            value={formState.password}
            required
            className="text-black w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:border-blue-500"
          />
        </div>
        <button
          disabled={!(formState.email && formState.password)}
          type="submit"
          className="w-full py-2 px-4 bg-blue-500 hover:bg-blue-600 text-white rounded-md focus:outline-none focus:ring focus:ring-blue-200"
        >
          Login
        </button>
      </form>
      {error && <p className="text-red-600 mt-2">{error.message}</p>}
      <p className="mt-4">
        Don't have an account?{' '}
        <Link to="/signup" className="text-blue-500 hover:underline">
          Sign up here
        </Link>
      </p>
    </div>
  );
}

export default Login;
