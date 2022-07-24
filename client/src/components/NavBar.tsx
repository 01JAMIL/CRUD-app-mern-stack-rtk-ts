import React from 'react'
import { Link } from 'react-router-dom'
import reactLogo from '../assets/react.svg'

const NavBar = () => {
    return (
        <nav className='navbar'>
            <div className="navbar-logo">
                <img src={reactLogo} alt="logo" />
            </div>
            <ul className='navbar-list-items'>
                <li className='navbar-item'>
                    <Link to='/products'>Products</Link>
                </li>
                <li className='navbar-item'>
                    <Link to='/new-product'>New product</Link>
                </li>
            </ul>
        </nav>
    )
}

export default NavBar