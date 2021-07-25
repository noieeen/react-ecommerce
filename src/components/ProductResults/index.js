import React, { useEffect } from 'react';
import './style.scss'

import Product from './Product';

import { useDispatch, useSelector } from 'react-redux'
import { fetchProductsStart } from '../../redux/Products/products.actions'


const mapState = ({ productsData }) => ({
    products: productsData.products
})

const ProductResults = ({ }) => {

    const dispatch = useDispatch();
    const { products } = useSelector(mapState)

    useEffect(() => {
        dispatch(fetchProductsStart())
    }, [])

    if (!Array.isArray(products)) return null;  //FUCKKK

    if (products.length < 1) {
        return (
            <div className='products'>
                <p>
                    No search results.
                </p>
            </div>
        )
    }

    return (
        <div className="products">
            <div className="productResults">
                {products.map((product, index) => {
                    const { productThumbnail, productName, productPrice } = product;
                    if (!productThumbnail || !productName ||
                        typeof productPrice == 'undefined') return null;

                    const configProduct = {
                        productThumbnail,
                        productName,
                        productPrice
                    }

                    return (
                        <Product{...configProduct} />
                    )
                })}
            </div>
        </div>
    )
}
export default ProductResults