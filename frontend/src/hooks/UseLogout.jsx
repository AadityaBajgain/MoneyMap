import {useAuthContext} from './UseAuthContext';
export const useLogout = () => {
    const { dispatch } = useAuthContext();
    const logout = async()=>{
        localStorage.removeItem('user');
        // localStorage.removeItem('token');
        // dispatch the logout action
        dispatch({type:'LOGOUT'});

    }
    return {logout};
}
