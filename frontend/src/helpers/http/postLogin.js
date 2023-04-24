import { makeRequest } from "../../utils/axiosHelper.jsx";

export const postLogin = async (inputs, setUserData) => {
  const res = await makeRequest.post("/login", inputs);
  setUserData(res.data);
};
