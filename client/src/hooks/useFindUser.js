import { useState, useEffect } from "react";

import inMemoryJWT from "../token";

export default function useFindUser() {
  const [user, setUser] = useState(null);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    async function findUser() {
      try {
        const response = await inMemoryJWT.refreshToken();
        if (response) {
          setUser(response.user);
          setLoading(false);
        } else {
          setLoading(false);
        }
      } catch (err) {
        setLoading(false);
      }
    }

    findUser();
  }, []);

  return {
    user,
    setUser,
    isLoading,
  };
}
