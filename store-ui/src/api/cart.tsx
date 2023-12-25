import axiosClient, { cartUrl } from "./config";

const addToCart = async (item: any) => {
  // 로그인한 유저가 있으면 로그인한 유저의 카트에 추가,
  // 로그인한 유저가 없으면 temp 카트에 추가(사이트 나가면 없어짐)

  try {
    const response = await axiosClient.post(cartUrl + "cart", {
      customerId: "john@example.com",
      items: [
        {
          productId: item?.productId,
          sku: item?.sku,
          title: item?.title,
          quantity: item?.quantity,
          price: item?.price,
          currency: item?.currency,
        },
      ],
    });
    return response.data;
  } catch (err: any) {
    console.log(err);
  }
};

export const getCart = async () => {
  try {
    const response = await axiosClient.get(
      cartUrl + "cart" + "/john@example.com"
    );
    return response.data;
  } catch (err: any) {
    console.log(err);
  }
};

export default addToCart;
