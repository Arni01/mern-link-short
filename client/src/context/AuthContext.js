import {createContext} from "react";

function nopp() {}

export const AuthContext = createContext({
  token: null,
  userId: null,
  login: nopp,
  logout: nopp,
  isAuthenticated: false
})