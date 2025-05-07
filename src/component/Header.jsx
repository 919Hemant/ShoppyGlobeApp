import { useState, useEffect } from 'react';
import './Header.css';
import HomeIcon from '@mui/icons-material/Home';
import LocalMallIcon from '@mui/icons-material/LocalMall';
import PersonIcon from '@mui/icons-material/Person';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import shoppingbag from '../assets/bag_shopping_icon_231414.png'

function Header() {
    const [showMenu, setShowMenu] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    function handleClick() {
        setShowMenu(!showMenu);
    }

    // Add scroll effect
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const cartItem = useSelector((store) => store.cart.items);
    console.log('cartItems', cartItem);
    return (
        <header className={`header-container ${scrolled ? 'scrolled' : ''}`}>
            <div className="header-wrapper">
                <div className="header-logo">
                    <img src={shoppingbag} alt="ShoppyGlobe Logo" className="logo-img" />
                    <h1 className="logo-text">SHOPPYGLOBE</h1>
                </div>

                <div className="header-search">
                    <div className="search-box">
                        <input type="text" placeholder="Search products..." />
                        <button className="search-button">
                            <SearchIcon />
                        </button>
                    </div>
                </div>

                <nav className="header-nav">
                    <Link to="/" className="nav-link"> 
                        <HomeIcon /> 
                        <span>Home</span>
                    </Link>
                    <Link to="/products" className="nav-link"> 
                        <LocalMallIcon /> 
                        <span>Products</span>
                    </Link>
                    <Link to="#" className="nav-link"> 
                        <PersonIcon />
                        <span>Login</span>
                    </Link>
                    <Link to="/cartDetails" className="nav-link cart-link"> 
                        <ShoppingCartIcon /> 
                        {cartItem.length > 0 && (
                            <span className="cart-badge">{cartItem.length}</span>
                        )}
                    </Link>
                </nav>

                <div className="mobile-menu">
                    <Link to="/cartDetails" className="mobile-cart">
                        <ShoppingCartIcon />
                        {cartItem.length > 0 && (
                            <span className="cart-badge">{cartItem.length}</span>
                        )}
                    </Link>
                    <button className="menu-toggle" onClick={handleClick}>
                        {!showMenu ? <MenuIcon /> : <CloseIcon />}
                    </button>
                </div>
            </div>

            {showMenu && (
                <div className="mobile-nav">
                    <div className="mobile-search">
                        <input type="text" placeholder="Search products..." />
                        <button><SearchIcon /></button>
                    </div>
                    <Link to="/" className="mobile-nav-link" onClick={() => setShowMenu(false)}>
                        <HomeIcon /> <span>Home</span>
                    </Link>
                    <Link to="/products" className="mobile-nav-link" onClick={() => setShowMenu(false)}>
                        <LocalMallIcon /> <span>Products</span>
                    </Link>
                    <Link to="#" className="mobile-nav-link" onClick={() => setShowMenu(false)}>
                        <PersonIcon /> <span>Login</span>
                    </Link>
                    <Link to="/cartDetails" className="mobile-nav-link" onClick={() => setShowMenu(false)}>
                        <ShoppingCartIcon /> <span>Cart</span>
                        {cartItem.length > 0 && (
                            <span className="mobile-cart-count">{cartItem.length}</span>
                        )}
                    </Link>
                </div>
            )}
        </header>
    );
}

export default Header;
