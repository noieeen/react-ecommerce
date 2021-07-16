import { auth } from "../../firebase/utils";
import { takeLatest, call, all, put } from "redux-saga/effects";
import productsTypes from "./products.types";
import { handleAddProduct } from "./porducts.helper"

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
    } catch (error) {
        // console.log(error);
    }
}

export function* onAddProductStart() {
    yield takeLatest(productsTypes.ADD_NEW_PRODUCT_START, addProduct)
}

export default function* productsSagas() {
    yield all([call(onAddProductStart)]);

}
