import { useContext } from "react";
import { UserContext } from "./UserContext";

export default function useAuth() {
  const { setUser } = useContext(UserContext);

  //set user
  const setUserContext = async (user) => {
    setUser(user);
  };

  return {
    setUserContext,
  };
}
