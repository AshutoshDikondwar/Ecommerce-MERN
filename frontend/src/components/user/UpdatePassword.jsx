import React, { Fragment, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { clearError, updatePassword } from '../../actions/UserAction'
import { useAlert } from 'react-alert'
import { useNavigate } from 'react-router-dom'
import { UPDATE_PASSWORD_RESET } from '../../constatnts/UserConstants'
import MetaData from '../layout/MetaData'
import Loader from '../layout/loader/Loader'
import './UpdatePassword.css'
import { MdLock, MdLockOpen, MdVpnKey } from 'react-icons/md'

const UpdatePassword = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const alert = useAlert()
    const { loading, isUpdated, error } = useSelector((state) => state.profile)
    const [oldPassword, setOldPassword] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")




    const updatePasswordSubmit = (e) => {
        e.preventDefault()
        const myForm = new FormData()
        myForm.set("oldPassword", oldPassword)
        myForm.set("newPassword", newPassword)
        myForm.set("confirmPassword", confirmPassword)

        dispatch(updatePassword(myForm))

    }

    useEffect(() => {
        if (error) {
            alert.error(error)
            dispatch(clearError())
        }
        if (isUpdated) {
            alert.success("Password updated successfully")
            navigate("/account")
            dispatch({
                type: UPDATE_PASSWORD_RESET
            })
        }
    }, [dispatch, error, alert, navigate, isUpdated])

    return (
        <Fragment>
            {loading ? <Loader /> : <Fragment>
                <MetaData title="Change Password" />
                <div className="updatePasswordContainer">
                    <div className="updatePasswordBox">
                        <h2 className='updatePasswordHeading'>Update Password</h2>
                        <form className='updatePasswordForm' onSubmit={updatePasswordSubmit}>
                            <div className="loginPassword">
                                <MdVpnKey />
                                <input type="password" placeholder='Old Password' required value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} />
                            </div>
                            <div className="loginPassword">
                                <MdLockOpen />
                                <input type="password" placeholder='New Password' required value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
                            </div>
                            <div className="loginPassword">
                                <MdLock />
                                <input type="password" placeholder='Confirm Password' required value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                            </div>

                            <input type="submit" value="Change" className='updatePasswordBtn' />
                        </form>

                    </div>
                </div>

            </Fragment>}
        </Fragment>
    )
}

export default UpdatePassword