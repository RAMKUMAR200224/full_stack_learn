import { useState } from 'react';
import { RegisterApi } from '../services/Api';
import { isAuthenticated } from '../services/Auth';
import { storeUserData } from '../services/Storage';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import NavBar from '../components/NavBar';
import './RegisterPage.css';

export default function RegisterPage() {
    const navigate = useNavigate();

    const getInitialErrorState = () => ({
        email: { required: false },
        password: { required: false },
        name: { required: false },
        custom_error: null
    });

    const [errors, setErrors] = useState(getInitialErrorState());
    const [loading, setLoading] = useState(false);
    const [inputs, setInputs] = useState({
        email: "",
        password: "",
        name: ""
    });

    const handleInput = (event) => {
        setInputs({ ...inputs, [event.target.name]: event.target.value });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        
        const newErrors = getInitialErrorState();
        let hasError = false;

        if (inputs.name.trim() === "") {
            newErrors.name.required = true;
            hasError = true;
        }
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

        RegisterApi(inputs)
            .then((response) => {
                storeUserData(response.data.idToken);
                navigate('/dashboard');
            })
            .catch((err) => {
                const errorMessage = err?.response?.data?.error?.message;

                if (errorMessage === "EMAIL_EXISTS") {
                    setErrors({ ...getInitialErrorState(), custom_error: "Already this email has been registered!" });
                } else if (errorMessage && String(errorMessage).includes('WEAK_PASSWORD')) {
                    setErrors({ ...getInitialErrorState(), custom_error: "Password should be at least 6 characters!" });
                } else {
                    setErrors({ ...getInitialErrorState(), custom_error: "Registration failed. Please try again." });
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
            <section className="register-block">
                <div className="container">
                    <div className="row">
                        <div className="col register-sec">
                            <h2 className="text-center">Register Now</h2>
                            <form onSubmit={handleSubmit} className="register-form">
                                <div className="form-group">
                                    <label htmlFor="nameInput" className="text-uppercase">Name</label>
                                    <input 
                                        type="text" 
                                        className="form-control" 
                                        onChange={handleInput} 
                                        name="name" 
                                        value={inputs.name}
                                        id="nameInput" 
                                    />
                                    {errors.name.required && (
                                        <span className="text-danger">Name is required.</span>
                                    )}
                                </div>
                                <div className="form-group">
                                    <label htmlFor="emailInput" className="text-uppercase">Email</label>
                                    <input 
                                        type="email" 
                                        className="form-control" 
                                        onChange={handleInput} 
                                        name="email" 
                                        value={inputs.email}
                                        id="emailInput" 
                                    />
                                    {errors.email.required && (
                                        <span className="text-danger">Email is required.</span>
                                    )}
                                </div>
                                <div className="form-group">
                                    <label htmlFor="passwordInput" className="text-uppercase">Password</label>
                                    <input 
                                        className="form-control" 
                                        type="password" 
                                        onChange={handleInput} 
                                        name="password" 
                                        value={inputs.password}
                                        id="passwordInput" 
                                    />
                                    {errors.password.required && (
                                        <span className="text-danger">Password is required.</span>
                                    )}
                                </div>
                                <div className="form-group">
                                    {errors.custom_error && (
                                        <span className="text-danger">
                                            <p>{errors.custom_error}</p>
                                        </span>
                                    )}
                                    {loading && (
                                        <div className="text-center">
                                            <div className="spinner-border text-primary" role="status">
                                                <span className="sr-only">Loading...</span>
                                            </div>
                                        </div>
                                    )}
                                    <input 
                                        type="submit" 
                                        className="btn btn-login float-right" 
                                        disabled={loading} 
                                        value="Register" 
                                    />
                                </div>
                                <div className="clearfix"></div>
                                <div className="form-group mt-3">
                                    Already have account? Please <Link to="/login">Login</Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}