import axios from "axios"

const axiosClient = axios.create();

axiosClient.defaults.headers.common = {
  'Content-Type': 'application/json',
  'Accept': 'application/json'
}

//All request will wait 2 seconds before timeout
axiosClient.defaults.timeout = 2000;

export const productsUrl = process.env.REACT_APP_PRODCUTS_URL_BASE
export const cartUrl = process.env.REACT_APP_CART_URL_BASE

export default axiosClient