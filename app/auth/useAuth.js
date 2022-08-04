import { useContext } from "react";
import AuthContext from "./context";
import authStorage from "./storage";
export default function useAuth() {
  const { user, setUser } = useContext(AuthContext);

  const logIn = (authToken) => {
    const user = authToken;
    try {
      setUser(user);
      authStorage.storeToken(authToken);
    } catch (e) {
      return null;
    }
  };

  const logOut = () => {
    setUser(null);
    authStorage.removeToken();
  };

  return { user, logIn, logOut };
}
// export default useAuth;
