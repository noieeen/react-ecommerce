import productsTypes from './products.types'

export const addProductStart = productData => ({
    type: productsTypes.ADD_NEW_PRODUCT_START,
    payload: productData
})

export const fetchProductsStart = () => ({
    type: productsTypes.FETCH_PRODUCT_START,
})

export const setProducts = products => ({
    type: productsTypes.SET_PRODUCT,
    payload:products
})

export const deleteProduct = productID => ({
    type: productsTypes.DELETE_PRODUCT,
    payload:productID
})