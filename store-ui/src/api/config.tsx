import axios from "axios";

const axiosClient = axios.create();

axiosClient.defaults.headers.common = {
  "Content-Type": "application/json",
  Accept: "application/json",
};

//All request will wait 2 seconds before timeout
axiosClient.defaults.timeout = 2000;

// Nginx를 통해 프록시 서버로 연결
export const productsUrl = `/api/products/`;
export const cartUrl = `/api/carts/`;
export const userUrl = `/api/users/`;

export default axiosClient;
