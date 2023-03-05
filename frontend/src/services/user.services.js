import axios from "axios";
import authHeader from "./auth-header";

const BASE_URL = process.env.REACT_APP_URL;

export const getAllInstructorsApi = async () => {
  try {
    const res = await axios.get(BASE_URL + "/user?type=KA-I", {
      headers: { ...authHeader() },
    });

    return res.data.data;
  } catch (e) {
    throw Error(e.response?.data?.msg ?? "Something went wrong");
  }
};

export const getAllTAApi = async () => {
  try {
    const res = await axios.get(BASE_URL + "/user?type=KA-TA", {
      headers: { ...authHeader() },
    });
    return res.data.data;
  } catch (e) {
    throw Error(e.response?.data?.msg ?? "Something went wrong");
  }
};

export const getLoggedUserApi = async () => {
  try {
    const res = await axios.get(BASE_URL + "/user/me", {
      headers: { ...authHeader() },
    });
    return res.data.data;
  } catch (e) {
    throw Error(e.response?.data?.msg ?? "Something went wrong");
  }
};

export const getLoggedUserEnrolledCourseApi = async () => {
  try {
    const res = await axios.get(BASE_URL + "/progress/completion", {
      headers: { ...authHeader() },
    });
    return res.data.data;
  } catch (e) {
    throw Error(e.response?.data?.msg ?? "Something went wrong");
  }
};

export const changePasswordApi = async (data) => {
  try {
    const res = await axios.post(BASE_URL + "/user/changepassword", data, {
      headers: { ...authHeader() },
    });
    return res.data.data;
  } catch (e) {
    throw Error(e.response?.data?.msg ?? "Something went wrong");
  }
};

export const changeUserDataApi = async (data) => {
  try {
    const res = await axios.put(BASE_URL + "/user", data, {
      headers: { ...authHeader() },
    });
    
    return res.data;
  } catch (e) {
    throw Error(e.response?.data?.msg ?? "Something went wrong");
  }
};