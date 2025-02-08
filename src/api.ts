import axios from "axios";

export const API = axios.create({
  baseURL: process.env.VUE_APP_BASEURL,
});

export const setAuthToken = (token: string | null) => {
  if (token) {
    API.defaults.headers.common["Authorization"] = `${token}`;
  } else {
    delete API.defaults.headers.common["Authorization"];
  }
};
