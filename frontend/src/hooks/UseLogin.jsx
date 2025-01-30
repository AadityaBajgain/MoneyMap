import React, { useState,useContext } from 'react';
import {useAuthContext} from './UseAuthContext';
export const useLogin = () => {
    const [error,setError] = useState(null);
    const [loading,setLoading] = useState(false);
    const {dispatch} = useAuthContext();
    const login = async(email,password)=>{
        setLoading(true);
        setError(null);

        const response = await fetch('http://localhost:3001/api/users/signup',{
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
    return {error,loading,login};
}
