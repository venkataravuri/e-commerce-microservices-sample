import axiosClient, { productsUrl } from "./config";

const getProductByProductId = async (id: any) => {
  try {
    const response = await axiosClient.get(productsUrl + "products/_id/" + id);
    return response.data;
  } catch (err: any) {}
};

export default getProductByProductId;
