import { useState } from "react";
import { useHistory, useLocation } from "react-router";
import axiosAuthInstance from "../../api/API";

export default function EditAccount() {
    let history = useHistory();
    const location = useLocation();

    const [account, setAccount] = useState(location.state)
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
        axiosAuthInstance.put("/user/account", account)
            .then(function () {
                history.goBack()
            })
            .catch(function (error) {
                setError(error.message)
            });
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
                    <p className="text-danger">{error}</p>
                    <button onClick={saveUser} type="button" className="btn btn-primary">Save</button>
                </div>
            </form>
        </div>
    </>
}