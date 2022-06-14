import React, { useEffect } from 'react';
import './login.css';
import { getUser } from "../../redux/actions";
import {connect} from "react-redux";
// import loginUser from "../../config/security/authentication"
// import {loginClient} from "../../config/security/authentication"
import {loginUser, loginClient} from "../../config/security/authentication";
import {useHistory} from "react-router-dom";
// import authentication from "../../config/security/authentication";


function Login(props) {
    let history = useHistory()
    let { getUser } = props

    useEffect(async() => {
        let token = await loginUser()
        if (token) {
            console.log(token)
            await getUser(token)
            history.push('/')
        }
        // await getUser(token)
        // loginUser()
        // props.history.push('/')
    }, [])

    return (
        <div className="container h-80">
            <div className="row align-items-center h-100">
                <div className="col-3 mx-auto mt-5">
                    <div className="text-center">
                        <img id="profile-img" className="rounded-circle profile-img-card" src="/anonymous.png" />
                        <form className="form-signin">
                            <button onClick={() => loginClient()} className="btn btn-lg btn-primary btn-block btn-signin" type="button">LOGIN TO JMASTER.IO</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

const mapDispatchToProps = {
    getUser,
};

export default connect(null, mapDispatchToProps)(Login);