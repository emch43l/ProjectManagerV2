import { useState } from "react";
import { axiosPublic } from "../axios/axios";
import { useNavigate } from "react-router-dom";
import useSignIn from "../hooks/useSignIn";

const LoginForm = () => {

    const login = useSignIn()
    const navigate = useNavigate();

    const [email,setEmail] = useState<string | null>(null);
    const [password,setPassword] = useState<string | null>(null);

    const handleForm = (e: React.MouseEvent) => {
        e.preventDefault();
        axiosPublic.post("auth/login",{
            email: email,
            password: password
        }).then(response => {
            login(response.data.token,response.data.refreshToken)
            navigate("/dashboard")
        }).catch(console.log)
        
    }

    return (
        <div>
            <div>
                <h1>Login form</h1>
                <div>
                    <form>
                        <input type="text" value={email ?? ""} onChange={(e) => setEmail(e.target.value)} />
                        <input type="text" value={password ?? ""} onChange={(e) => setPassword(e.target.value)} />
                        <button onClick={(e) => handleForm(e)}>Login</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export const DEFAULT_LOGIN_COMPONENT_ROUTE_PATH = "login";
export default LoginForm;