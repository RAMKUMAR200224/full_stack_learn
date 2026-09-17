import { Link } from "react-router-dom";
import { isAuthenticated } from "../services/Auth.jsx";

export default function NavBar(props) {
    const handleLogout = (event) => {
        event.preventDefault();
        if (props.logoutUser) {
            props.logoutUser();
        }
    };

    const authenticated = isAuthenticated();

    return (
        <nav className="navbar navbar-expand-md navbar-dark bg-dark">
            <Link className="navbar-brand" to="/">Ramkumar</Link>
            
            <button 
                className="navbar-toggler" 
                type="button" 
                data-toggle="collapse" 
                data-target="#navbarsExampleDefault" 
                aria-controls="navbarsExampleDefault" 
                aria-expanded="false" 
                aria-label="Toggle navigation"
            >
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarsExampleDefault">
                <ul className="navbar-nav mr-auto">
                    {!authenticated && (
                        <>
                            <li className="nav-item">
                                <Link className="nav-link" to="/register">Register</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/login">Login</Link>
                            </li>
                        </>
                    )}

                    {authenticated && (
                        <>
                            <li className="nav-item">
                                <Link className="nav-link" to="/dashboard">Dashboard</Link>
                            </li>
                            <li className="nav-item">
                                <a 
                                    className="nav-link" 
                                    href="#logout" 
                                    onClick={handleLogout} 
                                    style={{ cursor: "pointer" }}
                                >
                                    Logout
                                </a>
                            </li>
                        </>
                    )}
                </ul>
            </div>
        </nav>
    );
}