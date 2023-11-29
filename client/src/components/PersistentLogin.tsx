import { Outlet } from "react-router-dom";
import { useState, useEffect, useContext, useRef } from "react";
import useRefreshToken from "../hooks/useRefreshToken";
import AuthenticationContext from "../context/Auth/userContext";
import { AuthContext } from "../types/authContext";

const PersistenLogin = () => {
  const [isLoading, setIsLoading] = useState(true);
  const refresh = useRefreshToken();
  const { auth, persist } = useContext(AuthenticationContext) as AuthContext;

  const useIsMounted = () => {
    const isMounted = useRef(false);
    useEffect(() => {
      const verifyRefreshToken = async () => {
        isMounted.current = true;
        try {
          await refresh();
        } catch (err) {
          console.error(err);
        } finally {
          isMounted.current && setIsLoading(false);
        }
      };

      !auth?.accessToken && (persist === "true" ? true : false)
        ? verifyRefreshToken()
        : setIsLoading(false);

      return () => {
        isMounted.current = false;
      };
      // eslint-disable-next-line
    }, []);
    return isMounted
  }
  useIsMounted();

  // useEffect(() => {
  //   console.log(`isLoading: ${isLoading}`);
  //   console.log(`aT: ${JSON.stringify(auth?.accessToken)}`);
  //   // eslint-disable-next-line
  // }, [isLoading]);

  return (
    <>{!persist === Boolean("true") ? <Outlet /> : isLoading ? <div className="lds-facebook"><div></div><div></div><div></div></div> : <Outlet />}</>
  );
};

export default PersistenLogin;
