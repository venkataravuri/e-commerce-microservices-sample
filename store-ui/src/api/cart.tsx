import axiosClient, { cartUrl } from "./config";

const addToCart = async (loggedInUserEmail: string | null, item: any) => {
  // 로그인한 유저가 있으면 로그인한 유저의 카트에 추가,
  // 로그인한 유저가 없으면 temp 카트에 추가(사이트 나가면 없어짐) => 이건 나중에 구현

  try {
    const response = await axiosClient.post(
      `${cartUrl}cart/${loggedInUserEmail}`,
      {
        productId: item.productId,
        sku: item.sku,
        title: item.title,
        quantity: item.quantity,
        price: item.price,
        currency: item.currency,
      }
    );

    // Return the status code along with the data
    return {
      status: response.status,
      data: response.data,
    };
  } catch (err: any) {
    console.log(err);
  }
};

export const getCart = async (loggedInUserEmail: string | null) => {
  try {
    const response = await axiosClient.get(
      cartUrl + `cart/${loggedInUserEmail}`
    );
    return response.data;
  } catch (err: any) {
    console.log(err);
  }
};

export default addToCart;
