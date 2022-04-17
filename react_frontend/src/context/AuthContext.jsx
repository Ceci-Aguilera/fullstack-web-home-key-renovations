import axios from "axios";
import { createContext } from "react";
import { useEffect, useState, useContext } from "react";

import { useNavigate } from "react-router-dom"

const AuthContext = createContext();


const domain = process.env.REACT_APP_BACKEND_API_URL


export const getUser = async () => {

  const user_token = window.localStorage.getItem("user_token");

  const auth_url =  `${domain}/digital-warehouse/check-auth/`;

  if (user_token !== "undefined") {

    const config = {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Token ${user_token}`,
      },
    };


    return await axios
      .get(auth_url, config)
      .then(async (response) => {
        if (response.data) {
          
          const res = await response.data;
          console.log(res)
          if(res.username != "")
          {
            return { status: "SIGNED_IN", user: res};
          }
          else {
            return { status: "SIGNED_OUT", user: null};
          }
        } else {
          return { status: "SIGNED_OUT", user: null};
        }
      })
      .catch((err) => {
        return { status: "SIGNED_OUT", user: null};
      });
  } else {
    return { status: "SIGNED_OUT", user: null};
  }
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);


    const navigate = useNavigate();

    useEffect(() => {

      async function fetchUser(){
          const temp_auth = await getUser();
          setUser(temp_auth["user"]);
      }
    fetchUser(token);
    }, []);


  useEffect(() => {

    async function fetchUser(){
        const temp_auth = await getUser();
        setUser(temp_auth["user"]);
    }
if(token != null && token != undefined){
  fetchUser(token);
}
  }, [token]);

  const login = async (body) => {

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const login_url = `${domain}/digital-warehouse/login/`;

    return await axios
      .post(login_url, body, config)
      .then(async (response) => {
        const res = await response.data;
        const access_token = res["Result"];
        window.localStorage.setItem("user_token", access_token);
        setToken(access_token);
        return "Success"
      })
      .catch((error) => {
        return "Error"
      });
  };




  const logout = async () => {
    window.localStorage.removeItem("user_token");
      setUser(null);
  };


  return (
    <AuthContext.Provider value={{ user, token, logout, login}}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
export const AuthConsumer = AuthContext.Consumer;