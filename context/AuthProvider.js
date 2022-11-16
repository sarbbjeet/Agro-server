import React, { createContext, useState, useContext, useEffect } from "react";
import Cookies from "js-cookie";
import Router, { useRouter } from "next/router";
import axios from "axios";
const AuthContext = createContext({});

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function loadUserFromCookies() {
      const token = Cookies.get("authToken");
      if (token) {
        console.log("Got a token in the cookies, let's see if it is valid");
        // api.defaults.headers.Authorization = `Bearer ${token}`;
        const { data: user } = await axios("/api/user/login", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (user?.data) setUser(user?.data);
      }
      setLoading(false);
    }
    loadUserFromCookies();
  }, []);

  const login = async (email, password) => {
    try {
      const { data: token } = await axios.post("/api/user/login", {
        email,
        password,
      });
      if (!token) throw new Error("token is not received");

      Cookies.set("authToken", token?.data, { expires: 60 });
      //api.defaults.headers.Authorization = `Bearer ${token?.data}`;
      const { data: user } = await axios("/api/user/login", {
        headers: {
          Authorization: `Bearer ${token?.data}`,
        },
      });
      if (user) setUser(user);
      return { error: false, msg: "successfully login" };
    } catch (err) {
      if (err?.response?.data)
        return { error: true, msg: err?.response?.data?.error };
      return { error: true, msg: err?.message };
    }
  };

  const logout = () => {
    Cookies.remove("authToken");
    setUser(null);
    //delete api.defaults.headers.Authorization;
    window.location.pathname = "/";
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated: !!user, user, login, loading, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
