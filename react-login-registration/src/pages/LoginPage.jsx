import { useState } from 'react';
import { LoginApi } from '../services/Api';
import { storeUserData } from '../services/Storage';
import { isAuthenticated } from '../services/Auth';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import NavBar from '../components/NavBar';
import './LoginPage.css';

export default function LoginPage() {
    const navigate = useNavigate();

    const getInitialErrorState = () => ({
        email: { required: false },
        password: { required: false },
        custom_error: null
    });

    const [errors, setErrors] = useState(getInitialErrorState());
    const [loading, setLoading] = useState(false);
    const [inputs, setInputs] = useState({
        email: "",
        password: ""
    });

    const handleInput = (event) => {
        setInputs({ ...inputs, [event.target.name]: event.target.value });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        
        const newErrors = getInitialErrorState();
        let hasError = false;

        if (inputs.email.trim() === "") {
            newErrors.email.required = true;
            hasError = true;
        }
        if (inputs.password.trim() === "") {
            newErrors.password.required = true;
            hasError = true;
        }

        if (hasError) {
            setErrors(newErrors);
            return;
        }

        setLoading(true);
        setErrors(getInitialErrorState());

        LoginApi(inputs)
            .then((response) => {
                storeUserData(response.data.idToken);
                navigate('/dashboard');
            })
            .catch((err) => {
                if (err?.code === "ERR_BAD_REQUEST" || err?.response?.status === 400) {
                    setErrors({ ...getInitialErrorState(), custom_error: "Invalid Credentials." });
                } else {
                    setErrors({ ...getInitialErrorState(), custom_error: "Login failed. Please try again." });
                }
            })
            .finally(() => {
                setLoading(false);
            });
    };

    if (isAuthenticated()) {
        return <Navigate to="/dashboard" replace />;
    }

    return (
        <div>
            <NavBar />
            <section className="login-block">
                <div className="container">
                    <div className="row">
                        <div className="col login-sec">
                            <h2 className="text-center">Login Now</h2>
                            <form onSubmit={handleSubmit} className="login-form">
                                <div className="form-group">
                                    <label htmlFor="emailInput" className="text-uppercase">Email</label>
                                    <input 
                                        type="email"  
                                        className="form-control" 
                                        onChange={handleInput} 
                                        name="email" 
                                        value={inputs.email}
                                        id="emailInput" 
                                        placeholder="Email"  
                                    />
                                    {errors.email.required && (
                                        <span className="text-danger">Email is required.</span>
                                    )}
                                </div>
                                <div className="form-group">
                                    <label htmlFor="passwordInput" className="text-uppercase">Password</label>
                                    <input  
                                        type="password" 
                                        className="form-control" 
                                        onChange={handleInput}  
                                        name="password" 
                                        value={inputs.password}
                                        id="passwordInput"
                                        placeholder="Password" 
                                    />
                                    {errors.password.required && (
                                        <span className="text-danger">Password is required.</span>
                                    )}
                                </div>
                                <div className="form-group">
                                    {loading && (
                                        <div className="text-center">
                                            <div className="spinner-border text-primary" role="status">
                                                <span className="sr-only">Loading...</span>
                                            </div>
                                        </div>
                                    )}
                                    {errors.custom_error && (
                                        <span className="text-danger">
                                            <p>{errors.custom_error}</p>
                                        </span>
                                    )}
                                    <input  
                                        type="submit" 
                                        className="btn btn-login float-right" 
                                        disabled={loading}  
                                        value="Login" 
                                    />
                                </div>
                                <div className="clearfix"></div>
                                <div className="form-group mt-3">
                                    Create new account? Please <Link to="/register">Register</Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}