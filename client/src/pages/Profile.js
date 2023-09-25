import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_ME } from '../utils/queries';

function Profile () {

    const { loading, error, data } = useQuery(GET_ME);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error! {error.message}</div>;

    const user = data.me;

    return (
        <div>
            <h2>My Profile</h2>
            <p>Username: {user.username}</p>
            <p>Email: {user.email}</p>
        </div>
    );
}

export default Profile;