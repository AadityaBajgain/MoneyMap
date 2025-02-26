import React, { useState, useContext } from 'react';
import { useAuthContext } from './UseAuthContext';
import { useNavigate } from 'react-router-dom';

export const useLogin = () => {
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const { dispatch } = useAuthContext();
    const navigate = useNavigate();

    const login = async (email, password) => {
        setLoading(true);
        setError(null);

        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/user/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password })
        });

        const json = await response.json();

        if (!response.ok) {
            setError(json.message);
            setLoading(false);
        }
        if (response.ok) {
            localStorage.setItem('user', JSON.stringify(json));

            dispatch({ type: 'LOGIN', payload: json });
            setLoading(false);
            // Redirect to homepage
            navigate('/home');
        }
    }

    return { error, loading, login };
}
