import { useState, useEffect } from "react";
import axios from "axios";
import { API_BASE_URL } from "../../Configuration/apiConstants";
import { User } from "../../Types/User/UserType";

export function useAuth() {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
        setUser(JSON.parse(storedUser) as User);
    }
    setLoading(false);
  }, []);

  async function login(email: string, password: string) {
    setLoading(true);
    setError('');
    try {
      const response = await axios.post(API_BASE_URL, { email, password });
      const userData = response.data;

      setUser(userData);
      localStorage.setItem("user", JSON.stringify(userData));
      setLoading(false);
    } catch (err) {
      setError('Invalid credentials or server error.');
      setLoading(false);
    }
  }

  function logout() {
    localStorage.removeItem("user");
    setUser(null);
  }

  return {
    user,
    loading,
    error,
    login,
    logout,
  };
}
