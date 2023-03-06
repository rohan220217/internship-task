import axios from "axios";
import authHeader from "./auth-header";
import toast from "react-hot-toast";

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

export const updateUserApi = async ({ userId, data }) => {
  try {
    const res = await axios.put(BASE_URL + "/user/update/" + userId, data, {
      headers: { ...authHeader() },
    });
    toast.success(res.data.msg);
    return res.data.data;
  } catch (e) {
    throw Error(e.response?.data?.msg ?? "Something went wrong");
  }
};

export const deleteUserApi = async ({ userId }) => {
  try {
    const res = await axios.delete(BASE_URL + "/user/data/" + userId, {
      headers: { ...authHeader() },
    });
    toast.success(res.data.msg);
    return res.data.data;
  } catch (e) {
    throw Error(e.response?.data?.msg ?? "Something went wrong");
  }
};
