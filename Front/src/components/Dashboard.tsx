import useAxios from "../axios/useAxios";
import useSignOut from "../auth/useSignOut";

const Dashboard = () => {
    const signOut = useSignOut();
    const axios = useAxios();

    const makeRequest = () => {
        axios.get("test/get").then(console.log).catch(console.log)
    }

    const logout = () => {
        signOut()
    }


    return (
        <div>
            <h1>Dashboard</h1>
            <button onClick={logout}>Log Out</button>
            <button onClick={makeRequest}>Make Request</button>
        </div>
    )
}

export default Dashboard;