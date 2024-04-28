import { useState } from "react";
import { axiosPublic } from "../axios/axios";
import { useNavigate } from "react-router-dom";
import useSignIn from "../hooks/useSignIn";
import Card from "./Card";
import Center from "./Center";
import toast from "react-hot-toast";

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
        }).catch((e) => {
            console.log(e)
            toast.error("Login error !")
        })
        
    }

    return (
        <Center>
            <Card>
                <div>
                    <div className="">
                        <h1 className="mb-6 text-2xl font-bold text-center text-slate-700">Login</h1>
                        <div>
                            <form>
                                <div className="mt-2">
                                    <label className="block text-sm text-gray-400" htmlFor="email">Email</label>
                                    <input className="bg-gray-100 rounded-md" id="email" type="text" value={email ?? ""} onChange={(e) => setEmail(e.target.value)} />
                                </div>
                                <div className="mt-2">
                                    <label className="block text-sm text-gray-400" htmlFor="password">Password</label>
                                    <input className="bg-gray-100 rounded-md" id="password" type="password" value={password ?? ""} onChange={(e) => setPassword(e.target.value)} />
                                </div>
                                <div className="flex justify-center mt-8">
                                    <button className="bg-slate-400 text-white font-bold text-md px-4 py-1 rounded-md" onClick={(e) => handleForm(e)}>Login</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </Card>
        </Center>
       
    )
}

export const DEFAULT_LOGIN_COMPONENT_ROUTE_PATH = "login";
export default LoginForm;