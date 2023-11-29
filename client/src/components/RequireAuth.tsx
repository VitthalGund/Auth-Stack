import { useLocation, Outlet, Navigate } from 'react-router-dom'
import { useContext } from 'react'
import UserContext from '../context/Auth/userContext.ts';
import { AuthContext } from '../types/authContext.ts';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const RequireAuth = ({ allowedRoles }: any) => {
    const { auth, userData } = useContext(UserContext) as AuthContext;
    const location = useLocation();
    // console.log(auth?.roles == allowedRoles)
    return (
        <>
            {auth?.roles?.find(role => allowedRoles?.includes(role))
                ? <Outlet />
                : userData?.username
                    ? <Navigate to="/loginwithgoogle" state={{ from: location }} replace />
                    : <Navigate to="/login" state={{ from: location }} replace />
            }
        </>
    )
}

export default RequireAuth