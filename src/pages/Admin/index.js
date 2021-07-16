import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import './style.scss'

import { addProductStart } from '../../redux/Products/products.actions';

import Modal from '../../components/Modal';
import FormInput from '../../components/forms/FormInput';
import FormSelect from '../../components/forms/FormSelect';
import Button from '../../components/forms/Button';

const Admin = props => {

    const dispatch = useDispatch();
    const [hideModal,setHideModal] = useState(true);
    const [productCategory,setProductCategory] = useState('mens');
    const [productName,setProductName] = useState('')
    const [productThumbnail,setProductThumbnail] = useState('')
    const [productPrice,setProductPrice] = useState(0)

    const toggleModal = () => setHideModal(!hideModal);

    const configModal ={
        hideModal,
        toggleModal
    }

    const handelSubmit = e =>{
        e.preventDefault();

        dispatch(addProductStart({
            productCategory,
            productName,
            productThumbnail,
            productPrice
        }))
    }

    return (
        <div>
            <h1>My Admin</h1>
        </div>
    )
}

export default Admin;