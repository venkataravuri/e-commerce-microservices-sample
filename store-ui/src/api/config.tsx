import axios from "axios";

const axiosClient = axios.create();

axiosClient.defaults.headers.common = {
  "Content-Type": "application/json",
  Accept: "application/json",
};

//All request will wait 2 seconds before timeout
axiosClient.defaults.timeout = 2000;

// 프론트엔드에서의 API 엔드포인트 동적 구성
const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:3000";

//로컬호스트 백엔드 서비스 주소와 포트
// export const productsUrl = `${process.env.REACT_APP_PROD_URL_BASE}:${process.env.REACT_APP_PROD_PORT}/`;
// export const cartUrl = `${process.env.REACT_APP_CART_URL_BASE}:${process.env.REACT_APP_CART_PORT}/`;
// export const userUrl = `${process.env.REACT_APP_USER_URL_BASE}:${process.env.REACT_APP_USER_PORT}/`;

// Nginx를 통해 프록시 서버로 연결
export const productsUrl = `${apiUrl}/api/products/`;
export const cartUrl = `${apiUrl}/api/carts/`;
export const userUrl = `${apiUrl}/api/users/`;

export default axiosClient;
