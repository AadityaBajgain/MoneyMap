import React, { useState } from 'react';
import {useAuthContext} from './UseAuthContext';
export const useSignup = () => {
    const [error,setError] = useState(null);
    const [loading,setLoading] = useState(false);
    const {dispatch} = useAuthContext();
    const signup = async(email,password)=>{
        setLoading(true);
        setError(null);

        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/user/signup`,{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({email,password})
        });

        const json = await response.json();

        if(!response.ok){
            setError(json.message);
            setLoading(false);
        }
        if(response.ok){
            localStorage.setItem('user',JSON.stringify(json));

            dispatch({type:'LOGIN',payload:json});
            setLoading(false);
        }

    }
    return {error,loading,signup};
}
