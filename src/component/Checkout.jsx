import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import './Checkout.css';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import HomeIcon from '@mui/icons-material/Home';

/**
 * Checkout component for completing the purchase
 * @returns {JSX.Element} The Checkout component
 */
function Checkout() {
    const cartItems = useSelector((store) => store.cart.items);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        address: '',
        city: '',
        zipCode: '',
        country: '',
        paymentMethod: 'credit'
    });
    const [orderPlaced, setOrderPlaced] = useState(false);

    // Calculate totals
    const subtotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
    const shipping = subtotal > 100 ? 0 : 10;
    const tax = subtotal * 0.1; // 10% tax
    const total = subtotal + shipping + tax;

    /**
     * Handle form input changes
     * @param {Object} e - Event object
     */
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    /**
     * Check if the form is valid
     * @returns {boolean} Whether the form is valid
     */
    const isFormValid = () => {
        const { firstName, lastName, email, address, city, zipCode, country } = formData;
        return firstName && lastName && email && address && city && zipCode && country;
    };

    /**
     * Handle form submission
     * @param {Object} e - Event object
     */
    const handleSubmit = (e) => {
        e.preventDefault();
        if (isFormValid()) {
            // In a real app, you would submit order to the backend
            console.log('Order submitted:', { formData, items: cartItems, total });
            setOrderPlaced(true);
        }
    };

    // If no items in cart, show empty state
    if (cartItems.length === 0 && !orderPlaced) {
        return (
            <div className="checkout-empty-container">
                <ShoppingCartIcon className="empty-cart-icon" />
                <h2>Your cart is empty</h2>
                <p>Add some products to your cart before proceeding to checkout</p>
                <Link to="/products" className="shop-now-button">
                    Shop Now
                </Link>
            </div>
        );
    }

    // Show order confirmation
    if (orderPlaced) {
        return (
            <div className="order-success-container">
                <div className="success-message">
                    <div className="success-icon">✓</div>
                    <h2>Thank you for your order!</h2>
                    <p>Your order has been placed successfully.</p>
                    <p>Order number: <strong>#{Math.floor(100000 + Math.random() * 900000)}</strong></p>
                    <p>We've sent a confirmation email to <strong>{formData.email}</strong></p>
                    <div className="success-actions">
                        <Link to="/" className="home-button">
                            <HomeIcon /> Return to Home
                        </Link>
                        <Link to="/products" className="continue-shopping-button">
                            <ShoppingCartIcon /> Continue Shopping
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="checkout-container">
            <div className="checkout-header">
                <h1>Checkout</h1>
                <Link to="/cartDetails" className="back-to-cart">
                    <ArrowBackIcon /> Back to Cart
                </Link>
            </div>

            <div className="checkout-content">
                <div className="checkout-form-container">
                    <h2>Shipping Information</h2>
                    <form onSubmit={handleSubmit} className="checkout-form">
                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="firstName">First Name</label>
                                <input
                                    type="text"
                                    id="firstName"
                                    name="firstName"
                                    value={formData.firstName}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="lastName">Last Name</label>
                                <input
                                    type="text"
                                    id="lastName"
                                    name="lastName"
                                    value={formData.lastName}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="address">Address</label>
                            <input
                                type="text"
                                id="address"
                                name="address"
                                value={formData.address}
                                onChange={handleInputChange}
                                required
                            />
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="city">City</label>
                                <input
                                    type="text"
                                    id="city"
                                    name="city"
                                    value={formData.city}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="zipCode">Zip Code</label>
                                <input
                                    type="text"
                                    id="zipCode"
                                    name="zipCode"
                                    value={formData.zipCode}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="country">Country</label>
                            <select
                                id="country"
                                name="country"
                                value={formData.country}
                                onChange={handleInputChange}
                                required
                            >
                                <option value="">Select Country</option>
                                <option value="USA">United States</option>
                                <option value="Canada">Canada</option>
                                <option value="UK">United Kingdom</option>
                                <option value="Australia">Australia</option>
                                <option value="India">India</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>

                        <h2>Payment Method</h2>
                        <div className="payment-methods">
                            <div className="payment-method">
                                <input
                                    type="radio"
                                    id="credit"
                                    name="paymentMethod"
                                    value="credit"
                                    checked={formData.paymentMethod === 'credit'}
                                    onChange={handleInputChange}
                                />
                                <label htmlFor="credit">Credit Card</label>
                            </div>
                            <div className="payment-method">
                                <input
                                    type="radio"
                                    id="paypal"
                                    name="paymentMethod"
                                    value="paypal"
                                    checked={formData.paymentMethod === 'paypal'}
                                    onChange={handleInputChange}
                                />
                                <label htmlFor="paypal">PayPal</label>
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="place-order-button"
                            disabled={!isFormValid()}
                        >
                            Place Order
                        </button>
                    </form>
                </div>

                <div className="order-summary">
                    <h2>Order Summary</h2>
                    <div className="cart-items-summary">
                        {cartItems.map(item => (
                            <div className="cart-item-summary" key={item.id}>
                                <div className="item-image">
                                    <img src={item.images[0]} alt={item.title} />
                                </div>
                                <div className="item-details">
                                    <h3>{item.title}</h3>
                                    <p className="item-price">${item.price} × {item.quantity}</p>
                                </div>
                                <div className="item-total">
                                    ${(item.price * item.quantity).toFixed(2)}
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="price-details">
                        <div className="price-row">
                            <span>Subtotal</span>
                            <span>${subtotal.toFixed(2)}</span>
                        </div>
                        <div className="price-row">
                            <span>Shipping</span>
                            <span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
                        </div>
                        <div className="price-row">
                            <span>Tax</span>
                            <span>${tax.toFixed(2)}</span>
                        </div>
                        <div className="price-row total">
                            <span>Total</span>
                            <span>${total.toFixed(2)}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Checkout; 