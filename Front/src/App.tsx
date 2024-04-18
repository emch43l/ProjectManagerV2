import LoginForm, { DEFAULT_LOGIN_COMPONENT_ROUTE_PATH } from "./components/LoginForm";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import RegisterForm from "./components/RegisterForm";
import Dashboard from "./components/Dashboard";
import AuthProvider from "./auth/AuthProvider";
import ProtectedRoute from "./auth/ProtectedRoute";

const App = () => {
    return (
        <AuthProvider>
            <BrowserRouter>
                <Routes>
                    <Route path={DEFAULT_LOGIN_COMPONENT_ROUTE_PATH} element={<LoginForm/>}/>
                    <Route path="register" element={<RegisterForm/>}/>
                    <Route path="dashboard" element={<ProtectedRoute><Dashboard/></ProtectedRoute>}/>
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    )
}

export default App;