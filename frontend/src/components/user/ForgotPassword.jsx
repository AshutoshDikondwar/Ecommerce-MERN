import React, { Fragment, useEffect, useState } from 'react'
import { MdMailOutline } from 'react-icons/md'
import './ForgotPassword.css'
import Loader from '../layout/loader/Loader'


import { useDispatch, useSelector } from 'react-redux'
import { clearError, forgotPassword } from '../../actions/UserAction'
import { useAlert } from 'react-alert'
import MetaData from '../layout/MetaData'

const ForgotPassword = () => {

    const dispatch = useDispatch()
    const alert = useAlert()
    const { loading, message, error } = useSelector((state) => state.forgotPassword)
    const [email, setEmail] = useState("")



    const forgotPasswordSubmit = (e) => {
        e.preventDefault()
        const myForm = new FormData()
        myForm.set("email", email)

        dispatch(forgotPassword(myForm))

    }

    useEffect(() => {
        if (error) {
            alert.error(error)
            dispatch(clearError())
        }
        if (message) {
            alert.success(message)
        }
    }, [dispatch, error, alert, message])

    return (
        <Fragment>
            {loading ? <Loader /> : <Fragment>
                <MetaData title="Forgot Password" />
                <div className="forgotPasswordContainer">
                    <div className="forgotPasswordBox">
                        <h2 className='forgotPasswordHeading'>Forgot Password</h2>
                        <form className='forgotPasswordForm' onSubmit={forgotPasswordSubmit}>
                            <div className="updateProfileEmail">
                                <MdMailOutline />
                                <input type="email" name="email" placeholder='Email' value={email} required onChange={(e) => setEmail(e.target.value)} />
                            </div>
                            <input type="submit" value="Send" className='forgotPasswordBtn' />
                        </form>

                    </div>
                </div>

            </Fragment>}
        </Fragment>)
}

export default ForgotPassword