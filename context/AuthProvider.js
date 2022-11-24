import React, { createContext, useState, useContext, useEffect } from "react";
import Cookies from "js-cookie";
import Router, { useRouter } from "next/router";
import axios from "axios";
const AuthContext = createContext({});

const url = `/api/user/login`;
const createUserUrl = `/api/user`;

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [_token, setToken] = useState("");
  const router = useRouter();

  useEffect(() => {
    loadUserFromCookies();
  }, []);

  async function loadUserFromCookies() {
    const token = Cookies.get("authToken");
    if (token && token != "") {
      console.log("Got a token in the cookies, let's see if it is valid");
      // api.defaults.headers.Authorization = `Bearer ${token}`;
      const { data: user } = await axios(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (user?.data) setUser(user?.data);
      setToken(token);
    }
    setLoading(false);
  }

  const login = async (email, password) => {
    try {
      const { data: token } = await axios.post(url, {
        email,
        password,
      });
      if (!token?.data) throw new Error("token is not received"); // -->check for mistake token?.data

      Cookies.set("authToken", token?.data, { expires: 60 });
      //api.defaults.headers.Authorization = `Bearer ${token?.data}`;
      const { data: user } = await axios(url, {
        headers: {
          Authorization: `Bearer ${token?.data}`,
        },
      });
      if (user?.data) setUser(user?.data);
      setToken(token?.data);
      return { error: false, msg: "successfully login" };
    } catch (err) {
      if (err?.response?.data)
        return { error: true, msg: err?.response?.data?.error };
      return { error: true, msg: err?.message };
    }
  };

  const register = async (dataToSend) => {
    try {
      const { data } = await axios.post(createUserUrl, dataToSend);
      return { error: false, msg: "register successfully" };
    } catch (err) {
      if (err?.response?.data?.error)
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
      value={{
        isAuthenticated: !!user,
        user,
        login,
        loading,
        register,
        logout,
        loadUserFromCookies,
        token: _token,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
