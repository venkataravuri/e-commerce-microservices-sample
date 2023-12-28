import axios from "axios";

const axiosClient = axios.create();

axiosClient.defaults.headers.common = {
  "Content-Type": "application/json",
  Accept: "application/json",
};

//All request will wait 2 seconds before timeout
axiosClient.defaults.timeout = 2000;

export const productsUrl = `${process.env.REACT_APP_PROD_URL_BASE}:${process.env.REACT_APP_PROD_PORT}/`;
export const cartUrl = `${process.env.REACT_APP_CART_URL_BASE}:${process.env.REACT_APP_CART_PORT}/`;
export const userUrl = `${process.env.REACT_APP_USER_URL_BASE}:${process.env.REACT_APP_USER_PORT}/`;

export default axiosClient;
