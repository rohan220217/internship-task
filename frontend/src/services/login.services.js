import axios from "axios";
import authHeader from "./auth-header";
import toast from "react-hot-toast";

const BASE_URL = process.env.REACT_APP_URL;

export const loginRequestApi = async (data) => {
  try {
    const res = await axios.post(BASE_URL + "/auth/login", data, {
      headers: { ...authHeader() },
    });

    return res.data.data;
  } catch (e) {
    throw Error(e.response?.data?.msg ?? "Something went wrong");
  }
};

export const singupRequestApi = async (data) => {
  try {
    const res = await axios.post(BASE_URL + "/user/signup", data, {
      headers: { ...authHeader() },
    });

    toast.success(res.data.msg);
    return res.data.data;
  } catch (e) {
    throw Error(e.response?.data?.msg ?? "Something went wrong");
  }
};

export const forgotPassRequestApi = async (data) => {
  try {
    const res = await axios.post(BASE_URL + "/auth/forgotpassword", data, {
      headers: { ...authHeader() },
    });

    toast.success(res.data.msg);
    return res.data.data;
  } catch (e) {
    throw Error(e.response?.data?.msg ?? "Something went wrong");
  }
};
