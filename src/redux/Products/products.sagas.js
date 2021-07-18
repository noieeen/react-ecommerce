import { auth } from "../../firebase/utils";
import { takeLatest, call, all, put } from "redux-saga/effects";
import productsTypes from "./products.types";
import { handleAddProduct ,handleFetchProducts ,handleDeleteProduct} from "./products.helper"
import {setProducts,fetchProductsStart } from "./products.actions"

export function* addProduct({ payload: {
    productCategory,
    productName,
    productThumbnail,
    productPrice
} }) {
    try {
        const timestamp = new Date()
        yield handleAddProduct({
            productCategory,
            productName,
            productThumbnail,
            productPrice,
            productAdminUID:auth.currentUser.uid,
            createDate:timestamp
        })

        yield put(fetchProductsStart())
    } catch (error) {
        // console.log(error);
    }
}

export function* onAddProductStart() {
    yield takeLatest(productsTypes.ADD_NEW_PRODUCT_START, addProduct)
}

export function* fetchProducts(){
    try {
        const products = yield handleFetchProducts()
        yield put(
            setProducts(products)
        )
    } catch (error) {
        // console.log(error);
    }
}

export function* onFetchProductsStart(){
    yield takeLatest(productsTypes.FETCH_PRODUCT_START,fetchProducts)
}

export function* deleteProduct({payload}){
    try {
        yield handleDeleteProduct(payload)
        yield put(
            fetchProductsStart()
        )
    } catch (error) {
    //    console.log(error); 
    }
}

export function* onDeleteProductStart(){
    yield takeLatest(productsTypes.DELETE_PRODUCT_START,deleteProduct)
}


export default function* productsSagas() {
    yield all([call(onAddProductStart),call(onFetchProductsStart),call(onDeleteProductStart)]);

}
