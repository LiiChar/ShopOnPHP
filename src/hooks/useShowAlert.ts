import { useDispatch } from "react-redux"
import { setAlert, deleteAlert} from "../store/Slices/setUserSlice"
import {v4} from 'uuid'

export const useShowAlert = (): any => {
    const dispatch = useDispatch()
    return function (data: any) {
        let message
        if (data?.error) {
            message = data.error.data
        } else if (data?.data) {
            message = data.data
        }
        const id = v4()
        dispatch(setAlert({id: id, message}))
        new Promise(() => setTimeout(() => dispatch(deleteAlert(id)),5000))
    }

}