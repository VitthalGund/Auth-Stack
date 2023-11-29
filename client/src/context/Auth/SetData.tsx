import { useEffect, useState } from "react";
import UserContext from "./userContext";
import { auth, userData } from "../../types/authContext";


const SetData = (prop) => {
    const [userData, setUserData] = useState<userData>({ username: "", email: "" });
    const [auth, setAuth] = useState<auth>({ email: "", roles: [], accessToken: "", username: "" });
    // const [rmail, setRmail] = useState();
    const [persist, setPersist] = useState<string>(JSON.parse(localStorage.getItem("persist")!) || "false");
    useEffect(() => {
        localStorage.setItem("persist", JSON.stringify(persist));
    }, [persist])

    const updateUserData = (data: userData) => {
        setUserData(data);
    }

    const updateAuth = (data: auth) => {
        setAuth(data)
    }
    return (
        <UserContext.Provider value={{ userData, updateUserData, auth, updateAuth, setPersist, persist }}>
            {prop.children}
        </UserContext.Provider>
    )
}
export default SetData;