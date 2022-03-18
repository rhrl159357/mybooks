import { goBack } from "connected-react-router"
import { useCallback } from "react"
import { useDispatch, useSelector } from "react-redux"
import Add from "../compoment/Add"
import { RootState } from "../types"
import { logout as logoutSagaStart } from "../redux/modules/auth"

const AddContainer = () => {

    const loading = useSelector<RootState, boolean>(state => state.books.loading)

    const dispatch = useDispatch();

    const back = useCallback(() =>{
        dispatch(goBack())
    },[dispatch])

    const logout = useCallback(() =>{
        dispatch(logoutSagaStart())
    }, [dispatch])

    return <Add loding={loading} back={back} 
    logout={logout}
    />
}

export default AddContainer