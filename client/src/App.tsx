import { BrowserRouter as Router, Routes, Route, } from "react-router-dom";
import RequireAuth from "./components/RequireAuth.tsx";
import PersistenLogin from "./components/PersistentLogin.js";
import LogIn from "./components/Login.tsx";
import { Suspense } from "react";
import SignIn from "./components/Signup.tsx";

const ROLES = {
  'User': 2001,
  'Editor': 1984,
  'Admin': 5150
}
export default function App() {
  return (
    <>
      <Router>

        <Routes>
          <Route caseSensitive={true} path="/" element={
            <h1 className="text-2xl text-blue-700 font-bold flex justify-center items-center">Welcome to Auth stack</h1>
          }></Route>
          {/* Public route */}
          <Route element={<PersistenLogin />}>
            <Route caseSensitive={true} path="/login" element={
              <Suspense fallback={
                // You can use React Loading by
                // https://www.npmjs.com/package/react-loading
                // <ReactLoading type="bars" color="#4338ca" className="flex justify-center items-center align-middle m-auto" />
                // You are free to use any package or your own implementation
                <h1>Loading</h1>
              }>
                <LogIn />
              </Suspense>
            } />

            <Route caseSensitive={true} path="/signupmail" element={
              <Suspense fallback={
                // You can use React Loading by
                // https://www.npmjs.com/package/react-loading
                // <ReactLoading type="bars" color="#4338ca" className="flex justify-center items-center align-middle m-auto" />
                <h1>Loading</h1>
              }>
                <SignIn />
              </Suspense>
            } />

            {/* Protected route */}
            <Route element={<RequireAuth allowedRoles={[ROLES.User]} />}>
            </Route>
          </Route>
        </Routes>
      </Router>


    </>
  )
}