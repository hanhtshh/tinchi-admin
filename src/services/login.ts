import axios from "axios";
import config from "../config";

const loginAccount = async (email: string, password: string) => {
  return axios.post(`${config.service_host}/user/login`, {
    email,
    password,
  });
};

export { loginAccount };
