import { AuthContext } from "@/context/auth/auth-context";
import { use } from "react";

const useAuth = () => {
  const userInfo = use(AuthContext);
  return userInfo;
};

export default useAuth;
