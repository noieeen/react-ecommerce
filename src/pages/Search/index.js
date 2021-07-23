import './style.scss'
import React from 'react';
import ProductResults from '../../components/ProductResults'


const Search =({}) =>{
    return(
        <div className="searchPage">
            <h1>Browse Products</h1>
            <ProductResults/>
        </div>
    )
}

export default Search;