import { AuthContext } from "@/AuthContext/AuthContext";
import { use } from "react";


const useAuth = () => {
    const userInfo = use(AuthContext);
    return userInfo;
};

export default useAuth;