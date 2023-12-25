import axiosClient, { userUrl } from "./config";

const user_signin = async (email: string, password: string) => {
  try {
    const response = await axiosClient.post(userUrl + "sign-in", {
      email: email,
      password: password,
    });
    return response.data;
  } catch (err: any) {
    console.log(err);
  }
};

export default user_signin;
