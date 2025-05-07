import './Body.css';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import AttachEmailIcon from '@mui/icons-material/AttachEmail';
import InstagramIcon from '@mui/icons-material/Instagram';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import ExploreIcon from '@mui/icons-material/Explore';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import { Link } from 'react-router-dom';
import shoppingbag from '../assets/bag_shopping_icon_231414.png';

function Body() {
    return (
        <>
            <div className="hero-section">
                <div className="hero-content">
                    <h1 className="hero-title">DISCOVER THE PERFECT STYLE</h1>
                    <h2 className="hero-subtitle">Premium Shopping Experience with Incredible Deals</h2>
                    <div className="hero-actions">
                        <Link to='/products'><button className='primary-button'>Shop Now</button></Link>
                        <Link to='/products'><button className='secondary-button'>New Arrivals</button></Link>
                    </div>
                </div>
                <div className="hero-image-container">
                    <img 
                        src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80" 
                        alt="Shopping Experience" 
                        className="hero-image" 
                    />
                </div>
            </div>

            <div className="features-section">
                <h2 className="section-title">Why Choose Us</h2>
                <div className="features-grid">
                    <div className="feature-card">
                        <ShoppingBagIcon className="feature-icon" />
                        <h3>Fast Delivery</h3>
                        <p>Get your products delivered in 24-48 hours</p>
                    </div>
                    <div className="feature-card">
                        <LocalOfferIcon className="feature-icon" />
                        <h3>Best Deals</h3>
                        <p>Exclusive offers and discounts on premium products</p>
                    </div>
                    <div className="feature-card">
                        <ExploreIcon className="feature-icon" />
                        <h3>Wide Selection</h3>
                        <p>Browse through thousands of quality products</p>
                    </div>
                    <div className="feature-card">
                        <SupportAgentIcon className="feature-icon" />
                        <h3>24/7 Support</h3>
                        <p>Our customer service team is always available</p>
                    </div>
                </div>
            </div>

            <div className="cta-section">
                <div className="cta-content">
                    <h2>Limited Time Offer</h2>
                    <p>Get 30% off on all new arrivals</p>
                    <Link to='/products'><button className='primary-button'>Shop Now</button></Link>
                </div>
            </div>

            <footer className="footer">
                <div className="footer-content">
                    <div className="footer-brand">
                        <img src={shoppingbag} alt="ShoppyGlobe Logo" className="footer-logo" />
                        <h2 className="footer-title">ShoppyGlobe</h2>
                        <p className="footer-tagline">Your one-stop shop for all premium products</p>
                    </div>
                    <div className="footer-links">
                        <h3>Quick Links</h3>
                        <ul>
                            <li><Link to="/">Home</Link></li>
                            <li><Link to="/products">Products</Link></li>
                            <li><Link to="#">About Us</Link></li>
                            <li><Link to="#">Contact</Link></li>
                        </ul>
                    </div>
                    <div className="footer-contact">
                        <h3>Contact Us</h3>
                        <div className="contact-item">
                            <LocalPhoneIcon /> <span>+1 234 567 890</span>
                        </div>
                        <div className="contact-item">
                            <AttachEmailIcon /> <span>info@shoppyglobe.com</span>
                        </div>
                        <div className="footer-social">
                            <a href="#" className="social-icon"><InstagramIcon /></a>
                            <a href="#" className="social-icon"><AttachEmailIcon /></a>
                            <a href="#" className="social-icon"><LocalPhoneIcon /></a>
                        </div>
                    </div>
                </div>
                <div className="footer-bottom">
                    <p>&copy; 2024 ShoppyGlobe. All rights reserved.</p>
                </div>
            </footer>
        </>
    )
}

export default Body;