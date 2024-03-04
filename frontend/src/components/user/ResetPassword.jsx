import { useDispatch, useSelector } from 'react-redux'
import { clearError, resetPassword } from '../../actions/UserAction'
import { useAlert } from 'react-alert'
import { useNavigate } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import MetaData from '../layout/MetaData'
import Loader from '../layout/loader/Loader'
import './ResetPassword.css'
import { useState, useEffect, Fragment } from 'react'
import { MdLock, MdLockOpen } from 'react-icons/md'


const ResetPassword = () => {
    const navigate = useNavigate()
    const params = useParams()
    const dispatch = useDispatch()
    const alert = useAlert()
    const { loading, success, error } = useSelector((state) => state.forgotPassword)

    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")




    const resetPasswordSubmit = (e) => {
        e.preventDefault()
        const myForm = new FormData()
        myForm.set("password", password)
        myForm.set("confirmPassword", confirmPassword)

        dispatch(resetPassword(params.token, myForm))

    }

    useEffect(() => {
        if (error) {
            alert.error(error)
            dispatch(clearError())
        }
        if (success) {
            alert.success("Password updated successfully")
            navigate("/login")
        }
    }, [dispatch, error, alert, navigate, success])

    return (
        <Fragment>
            {loading ? <Loader /> : <Fragment>
                <MetaData title="Reset Password" />
                <div className="resetPasswordContainer">
                    <div className="resetPasswordBox">
                        <h2 className='resetPasswordHeading'>Update Password</h2>
                        <form className='resetPasswordForm' onSubmit={resetPasswordSubmit}>

                            <div>
                                <MdLockOpen />
                                <input type="password" placeholder='Password' required value={password} onChange={(e) => setPassword(e.target.value)} />
                            </div>
                            <div>
                                <MdLock />
                                <input type="password" placeholder='Confirm Password' required value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                            </div>

                            <input type="submit" value="Update" className='resetPasswordBtn' />
                        </form>

                    </div>
                </div>

            </Fragment>}
        </Fragment>
    )
}

export default ResetPassword