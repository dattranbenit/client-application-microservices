import { useState } from "react"
import { Link, useHistory } from "react-router-dom";
import { logout } from "../../redux/actions";
import { connect } from "react-redux";

function TopHeader(props) {
    let { user, logout } = props
    const [show, setShow] = useState(false)
    let history = useHistory();

    let logoutToLogin = () => {
        logout()
        history.push('/login')
    }

    return <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
            <Link className="navbar-brand" to="/"><img style={{ width: 30 }} className="rounded-circle profile-img-card" src="/logo192.png" /></Link>
            <button className="navbar-toggler" type="button" onClick={() => setShow(!show)}>
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className={`collapse navbar-collapse ${show && 'show'}`}>
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                        <Link className="nav-link active" to="/accounts">Accounts</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link active" to="/statistics">Statistics</Link>
                    </li>
                </ul>
                <form className="d-flex">
                    <button className="btn btn-outline-light" type="button" onClick={logoutToLogin}>Logout {user?.name}</button>
                </form>
            </div>
        </div>
    </nav>
}

const mapStateToProps = (state) => {
    return {
        user: state.security.user
    };
};

const mapDispatchToProps = {
    logout,
};

export default connect(mapStateToProps, mapDispatchToProps)(TopHeader);