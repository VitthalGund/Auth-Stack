import { BrowserRouter as Router, Routes, Route, } from "react-router-dom";
import RequireAuth from "./components/RequireAuth.tsx";
import PersistenLogin from "./components/PersistentLogin.js";

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
          {/* Public route */}
          <Route element={<PersistenLogin />}>

            {/* Protected route */}
            <Route element={<RequireAuth allowedRoles={[ROLES.User]} />}>
            </Route>
          </Route>
        </Routes>
      </Router>


    </>
  )
}