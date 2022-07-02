import axiosClient, { cartUrl } from "./config"

const addToCart = async (item: any) => {
    try {
        const response = await axiosClient.post(cartUrl + 'cart', {
            customerId: "john@example.com",
            items: [
                {
                    productId: item?.productId,
                    sku: item?.sku,
                    title: item?.title,
                    quantity: item?.quantity,
                    price: item?.price,
                    currency: item?.currency
                }
            ]
        })
        return response.data
    } catch (err: any) {
        console.log(err)
    }
}

export const getCart = async () => {
    try {
        const response = await axiosClient.get(cartUrl + 'cart' + '/john@example.com')
        return response.data
    } catch (err: any) {
        console.log(err)
    }
}

export default addToCart