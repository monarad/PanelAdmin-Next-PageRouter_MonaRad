import { useRouter } from "next/router";
import { getCookie } from "../utils/cookie";

// eslint-disable-next-line
function AuthProvider({ children }) {
  const router = useRouter();
  const token = getCookie("token");
  if (!token) return router.push("/LoginPage");

  return children;
}

export default AuthProvider;
