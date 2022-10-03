import {Navigate, Outlet} from 'react-router-dom'
import {useAppSelector} from "../../../c0-common/c1-hooks/hooks";
import {PATH} from './RoutesPage'


export const PrivateRoutes = () => {
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)

    return (
        isLoggedIn ? <Outlet/> : <Navigate to={PATH.LOGIN}/>
    )
}