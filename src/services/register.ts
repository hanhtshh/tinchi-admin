import axios from "axios";
import config from "../config";

const registerAccount = async (
  email: string,
  password: string,
  name: string,
  phone_number: string,
  secret: string
) => {
  return axios.post(`${config.service_host}/user/register`, {
    email,
    password,
    name,
    phone_number,
    secret,
  });
};

export { registerAccount };
