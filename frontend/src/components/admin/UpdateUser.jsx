import React, { Fragment, useEffect, useState } from 'react'
import './newProduct.css'
import MetaData from '../layout/MetaData'
import Sidebar from './Sidebar'
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import PersonIcon from '@mui/icons-material/Person';
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { useAlert } from 'react-alert'
import { Button } from '@mui/material'
import { UPDATE_USER_RESET } from '../../constatnts/UserConstants'
import { getUserDetails, updateUser, clearError } from '../../actions/UserAction'
import Loader from '../layout/loader/Loader';

const UpdateUser = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const alert = useAlert()
    const params = useParams()

    const { loading, error, user } = useSelector((state) => state.userDetails)
    const { loading: updateLoading, error: updateError, isUpdated } = useSelector((state) => state.profile)
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [role, setRole] = useState("")

    const userId = params.id




    const updateUserSubmitHandler = (e) => {
        e.preventDefault()
        const myform = new FormData()
        myform.set("name", name)
        myform.set("email", email)
        myform.set("role", role)

        dispatch(updateUser(userId, myform))
    }


    useEffect(() => {

        if (user && user._id !== userId) {
            dispatch(getUserDetails(userId))
        } else {
            setName(user.name)
            setEmail(user.email)
            setRole(user.role)

        }
        if (error) {
            alert.error(error)
            dispatch(clearError())
        }
        if (updateError) {
            alert.error(updateError)
            dispatch(clearError())
        }

        if (isUpdated) {
            alert.success("User Updated Successfully")
            navigate("/admin/users")
            dispatch({ type: UPDATE_USER_RESET })
        }
    }, [dispatch, error, alert, navigate, isUpdated, updateError, user, userId])


    return (

        <Fragment>
            <MetaData title="Update User" />
            <div className="dashboard">
                <Sidebar />
                <div className="newProductContainer">
                    {loading ? <Loader /> : <form
                        className="createProductForm"
                        onSubmit={updateUserSubmitHandler}
                    >
                        <h1>Update User</h1>

                        <div>
                            <PersonIcon />
                            <input
                                type="text"
                                placeholder="Name"
                                required
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div>
                            <MailOutlineIcon />
                            <input
                                type="email"
                                placeholder="Email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}

                            />
                        </div>

                        <div>
                            <VerifiedUserIcon />
                            <select value={role} onChange={(e) => setRole(e.target.value)}>
                                <option value="">Choose Role</option>
                                <option value="admin">Admin</option>
                                <option value="user">User</option>

                            </select>
                        </div>



                        <Button
                            id="createProductBtn"
                            type="submit"
                            disabled={updateLoading ? true : false || role === "" ? true : false}
                        >
                            Update
                        </Button>
                    </form>}
                </div>
            </div>
        </Fragment>
    )

}

export default UpdateUser