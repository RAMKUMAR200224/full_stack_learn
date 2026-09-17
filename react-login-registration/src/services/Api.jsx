import axios from "axios";
import { getUserData } from './Storage';

axios.defaults.baseURL = "https://identitytoolkit.googleapis.com/v1";

// Ensure you replace this string with your valid Firebase Web API Key
const API_KEY = "%YOUR_FIREBASE_API_KEY%";

const REGISTER_URL = `/accounts:signUp?key=${API_KEY}`;
const LOGIN_URL = `/accounts:signInWithPassword?key=${API_KEY}`;
const USER_DETAILS_URL = `/accounts:lookup?key=${API_KEY}`;

export const RegisterApi = (inputs) => {
    const data = { 
        displayName: inputs.name, 
        email: inputs.email, 
        password: inputs.password,
        returnSecureToken: true
    };
    return axios.post(REGISTER_URL, data);
};

export const LoginApi = (inputs) => {
    const data = { 
        email: inputs.email, 
        password: inputs.password,
        returnSecureToken: true
    };
    return axios.post(LOGIN_URL, data);
};

export const UserDetailsApi = () => {
    const data = { idToken: getUserData() };
    return axios.post(USER_DETAILS_URL, data);
};