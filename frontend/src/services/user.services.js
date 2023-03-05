import axios from "axios";
import authHeader from "./auth-header";

const BASE_URL = process.env.REACT_APP_URL;

export const getAllUsersApi = async () => {
  try {
    const res = await axios.get(BASE_URL + "/user/data", {
      headers: { ...authHeader() },
    });

    return res.data.data;
  } catch (e) {
    throw Error(e.response?.data?.msg ?? "Something went wrong");
  }
};
