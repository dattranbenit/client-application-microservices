import { useState} from "react";
import {updateAccount} from "../../redux/actions";
import {connect} from "react-redux";
import {useHistory} from "react-router-dom";

function UpdateAccount(props) {
    let history = useHistory()
    let { updateAccount } = props

    const [account, setAccount] = useState(history.location.state)

    let setParam = (event) => {
        setAccount({ ...account, [event.target.name]: event.target.value })
    }

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
        await updateAccount(account)
        history.push("/accounts")
    }

    return <>
        <div className="col-12 mt-4">
            <button onClick={() => history.goBack()} type="button" className="btn btn-success">List Accounts</button>
        </div>
        <div className="col-12 mt-4 table-responsive">
            <form>
                <div className="mb-3">
                    <label className="form-label">Name</label>
                    <input type="text" className="form-control" name="name" value={account.name} onChange={setParam} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Username</label>
                    <input type="text" className="form-control" name="username" value={account.username} onChange={setParam} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Email address</label>
                    <input type="email" className="form-control" value={account.email} name="email" onChange={setParam} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Roles</label>
                    <div className="form-check">
                        <label className="form-check-label" >
                            <input className="form-check-input" type="checkbox" defaultChecked={account.roles.indexOf("ROLE_PREMIUM_MEMBER") !== -1} value="ROLE_PREMIUM_MEMBER" onChange={setRoles} />
                            ROLE PREMIUM MEMBER
                        </label>
                    </div>
                    <div className="form-check">
                        <label className="form-check-label" >
                            <input className="form-check-input" type="checkbox" defaultChecked={account.roles.indexOf("ROLE_MEMBER") !== -1} value="ROLE_MEMBER" onChange={setRoles} />
                            ROLE MEMBER
                        </label>
                    </div>
                </div>
                <div className="mb-3">
                    <button onClick={saveUser} type="button" className="btn btn-primary">Save</button>
                </div>
            </form>
        </div>
    </>
}

const mapDispatchToProps = {
    updateAccount,
};

export default connect(null, mapDispatchToProps)(UpdateAccount);