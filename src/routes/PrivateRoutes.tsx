import {Navigate, Outlet} from 'react-router-dom'
import {useAppSelector} from "../hooks/hooks";
import {path} from "../enums/path";


export const PrivateRoutes = () => {
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)

    return (
        isLoggedIn ? <Outlet/> : <Navigate to={path.LOGIN}/>
    )
}