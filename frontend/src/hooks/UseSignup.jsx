import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from './UseAuthContext';
import { buildApiUrl } from './api';
export const useSignup = () => {
    const [error,setError] = useState(null);
    const [loading,setLoading] = useState(false);
    const {dispatch} = useAuthContext();
    const navigate = useNavigate();
    const signup = async(email,password)=>{
        setLoading(true);
        setError(null);

        try {
            const response = await fetch(buildApiUrl('/api/user/signup'),{
                method:'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({email,password})
            });
    
            const json = await response.json().catch(() => ({}));
    
            if(!response.ok){
                setError(json.error || 'Unable to create account.');
                return;
            }
            localStorage.setItem('user',JSON.stringify(json));
    
            dispatch({type:'LOGIN',payload:json});
            navigate('/');
        } catch (err) {
            setError('Unable to reach the server. Please try again.');
        } finally {
            setLoading(false);
        }
    }
    return {error,loading,signup};
}
