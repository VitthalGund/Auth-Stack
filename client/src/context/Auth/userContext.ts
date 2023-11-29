import { createContext } from "react";
import { AuthContext } from "../../types/authContext";

const AuthenticationContext = createContext<AuthContext | null>(null);

export default AuthenticationContext;
