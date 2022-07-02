import axiosClient, {productsUrl} from "./config"

const getProductByVariantSku = async (id: any) => {
    try {
        const response = await axiosClient.get(productsUrl + 'products/sku/' + id)
        return response.data
    } catch (err: any) {
        
    }
}

export default getProductByVariantSku