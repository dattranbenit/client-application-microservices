import { useState } from "react";
import {addAccount} from "../../redux/actions";
import {connect} from "react-redux";
import { withRouter, useHistory } from 'react-router-dom'

function AddAccount(props) {
    let history = useHistory()
    let { addAccount } = props
    const [account, setAccount] = useState({
        name: '',
        password: '',
        username: '',
        email: '',
        roles: []
    })
    const [error, setError] = useState()

    let setParam = (event) => {
        setAccount({ ...account, [event.target.name]: event.target.value })
    }

    //checkbox
    let setRoles = (event) => {
        const value = event.target.value
        if (event.target.checked) {
            setAccount({ ...account, roles: [...account.roles, value] })
        } else {
            let roles = account.roles.filter(item => {
                return item !== value
            })
            setAccount({ ...account, roles })
        }
    }

    let saveUser = async () => {
        await addAccount(account)//finish adding then go back
        history.goBack()
    }

    return <>
        <div className="col-12 mt-4">
            <button onClick={() => history.goBack()} type="button" className="btn btn-success">List Accounts</button>
        </div>
        <div className="col-12 mt-4 table-responsive">
            <form>
                <div className="mb-3">
                    <label className="form-label">Name</label>
                    <input type="text" className="form-control" name="name" onChange={setParam} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Username</label>
                    <input type="text" className="form-control" name="username" onChange={setParam} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Password</label>
                    <input type="password" className="form-control" name="password" onChange={setParam} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Email address</label>
                    <input type="email" className="form-control" placeholder="name@example.com" name="email" onChange={setParam} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Roles</label>
                    <div className="form-check">
                        <label className="form-check-label" >
                            <input className="form-check-input" type="checkbox" value="ROLE_PREMIUM_MEMBER" onChange={setRoles} />
                            ROLE PREMIUM MEMBER
                        </label>
                    </div>
                    <div className="form-check">
                        <label className="form-check-label" >
                            <input className="form-check-input" type="checkbox" value="ROLE_MEMBER" onChange={setRoles} />
                            ROLE MEMBER
                        </label>
                    </div>
                </div>
                <div className="mb-3">
                    <p className="text-danger">{error}</p>
                    <button onClick={saveUser} type="button" className="btn btn-primary">Save</button>
                </div>
            </form>
        </div>
    </>
}

const mapDispatchToProps = {
    addAccount,
};

export default withRouter(connect(null, mapDispatchToProps)(AddAccount));