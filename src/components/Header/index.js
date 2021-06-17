import React from 'react'
import './style.scss'
import Logo from './../../assets/logo.png'

const Header = props =>{
    return(
        <header className='header'>
            <div className="warp">
                <div className="logo">
                    <img src={Logo} alt="Shop" />
                </div>
            </div>

        </header>
    )
}

export default Header;