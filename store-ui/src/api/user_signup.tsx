import axiosClient, { userUrl } from "./config";

const user_signup = async (name: string, email: string, password: string) => {
  try {
    const response = await axiosClient.post(`${userUrl}sign-up`, {
      name: name,
      email: email,
      password: password,
    });
    return response.data;
  } catch (err: any) {
    console.log(err);
  }
};

export default user_signup;
