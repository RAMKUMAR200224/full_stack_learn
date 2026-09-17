import { getUserData, removeUserData } from "./Storage";

export const isAuthenticated = () => {
    return getUserData() !== null;
};

export const logout = () => {
    removeUserData();
};