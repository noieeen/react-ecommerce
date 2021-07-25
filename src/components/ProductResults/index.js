import React, { useEffect } from 'react';
import './style.scss'

import Product from './Product';
import { useHistory,useParams } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux'
import { fetchProductsStart } from '../../redux/Products/products.actions'
import FormSelect from '../forms/FormSelect';

const mapState = ({ productsData }) => ({
    products: productsData.products
})



const ProductResults = ({ }) => {

    const dispatch = useDispatch();
    const history = useHistory();
    const {filterType} = useParams();
    const { products } = useSelector(mapState)
    

    useEffect(() => {
        dispatch(fetchProductsStart({filterType}))
    }, [filterType])


    const handleFilter = (e) => {
        const nextFliter = e.target.value;
        history.push(`/search/${nextFliter}`)
    }


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

    const configFilters = {
        defaultValue:filterType,
        options: [{
            name: 'Show all',
            value: ''
        }, {
            name: 'Mens',
            value: 'mens'
        }, {
            name: 'Womens',
            value: 'womens'
        }],
        handleChange: handleFilter
    }

    return (
        <div className="products">

            <h1>Browse Products</h1>

            <FormSelect {...configFilters} />

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
                        <Product key={index} {...configProduct} />
                    )
                })}
            </div>
        </div>
    )
}
export default ProductResults