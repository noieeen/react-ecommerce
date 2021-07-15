import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import './style.scss'
import { checkUserIsAdmin } from '../../Utils';


const mapState = ({ user }) => ({
    currentUser: user.currentUser
})

const AdminToolbar = props => {

    const {currentUser} =useSelector(mapState)

    const isAdmin = checkUserIsAdmin(currentUser);
    if(!isAdmin) return null;

    return (
        <div className="adminToolbar">
            <ul>
                <li>
                    <Link to="/admin">
                        My Admin
                    </Link>
                </li>
                <li>
                    <Link to="/product">Product</Link>
                </li>
            </ul>
        </div>
    )
}

export default AdminToolbar;