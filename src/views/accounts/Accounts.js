import { useEffect } from "react";
import { Link, useHistory, withRouter} from "react-router-dom";
import { getAccounts, deleteAccount } from "../../redux/actions";
import { connect } from "react-redux";

function Accounts(props) {
    let history = useHistory()
    let { accounts, getAccounts, deleteAccount } = props

    useEffect(async () => {
        await getAccounts()
    }, [])

    let deleteAccountUser = async (id) => {
        await deleteAccount({id: id})
    }

    let navigateEditAccount = (account) => {
        history.push("/account/edit", account);// push state to get when redirect to new url (history.location.state)
    }

    return <>
        <div className="col-12 mt-4">
            <Link to="/account/add" className="btn btn-primary">Create New</Link>
        </div>
        <div className="col-12 mt-4 table-responsive">
            <table className="table table-bordered table-hover align-middle">
                <thead>
                    <tr>
                        <th >#</th>
                        <th >Name</th>
                        <th >Username</th>
                        <th >Email</th>
                        <th >Roles</th>
                        <th >Options</th>
                    </tr>
                </thead>
                <tbody>
                    {accounts && accounts.length !== 0 && accounts.map(account => (
                        <tr key={account.id}>
                            <th >{account.id}</th>
                            <td>{account.name}</td>
                            <td>{account.username}</td>
                            <td>{account.email}</td>
                            <td>{account.roles.toString()}</td>
                            <td>
                                <button onClick={() => navigateEditAccount(account)} type="button" className="btn btn-outline-primary">Edit</button>
                                <button onClick={() => deleteAccountUser(account.id)} type="button" className="btn btn-outline-danger m-1">Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </>
}

const mapStateToProps = (state) => {
    return {
        accounts: state.account.accounts
    };
};

const mapDispatchToProps = {
    getAccounts,
    deleteAccount,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Accounts));