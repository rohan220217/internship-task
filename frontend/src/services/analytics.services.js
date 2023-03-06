import axios from "axios";
import authHeader from "./auth-header";
import toast from "react-hot-toast";

const BASE_URL = process.env.REACT_APP_URL;

export const getAllAnalyticsUserApi = async ({ userId }) => {
  try {
    const res = await axios.get(BASE_URL + "/analytics/data/" + userId, {
      headers: { ...authHeader() },
    });
    return res.data.data;
  } catch (e) {
    throw Error(e.response?.data?.msg ?? "Something went wrong");
  }
};
export const addAnalyticsApi = async ({ value }) => {
  try {
    const res = await axios.post(BASE_URL + "/analytics/add", value, {
      headers: { ...authHeader() },
    });
    toast.success(res.data.msg);
    return res.data.data;
  } catch (e) {
    throw Error(e.response?.data?.msg ?? "Something went wrong");
  }
};
