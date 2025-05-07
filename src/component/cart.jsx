import { useDispatch, useSelector } from "react-redux";
import { decrementItem, incrementItem } from "../utils/cartSlice";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { Link } from "react-router-dom";
// import HomeIcon from '@mui/icons-material/Home';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import './cart.css';

/**
 * Cart component that displays all items in the cart
 * @returns {JSX.Element} The Cart component
 */
function Cart() {
    const cartItems = useSelector((store) => store.cart.items);
    const dispatch = useDispatch();
    
    // Calculate cart total
    const cartTotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
    
    /**
     * Increment item quantity
     * @param {Object} item - The item to increment
     */
    function handleIncrement(item) {
        dispatch(incrementItem(item));
    }
    
    /**
     * Decrement item quantity
     * @param {Object} item - The item to decrement
     */
    function handleDecrement(item) {
        dispatch(decrementItem(item));
    }
    
    // Show empty cart message if no items
    if (cartItems.length === 0) {
        return (
            <div className="not-found-container flex flex-col h-[100vh] items-center justify-center">
                <h1 className='text-4xl font-semibold'>No items Found</h1>
                <Link to='/products'>
                    <button className='bg-[#f49547] rounded-md mt-3 text-white font-medium py-2 flex items-center px-4 hover:bg-[#e34212]'>
                        <ShoppingBasketIcon /> Browse-More
                    </button>
                </Link>
            </div>
        );
    }
    
    return (
        <div className="cart-container">
            <div className="cart-header">
                <h1 className="text-2xl font-bold mb-4">Your Cart ({cartItems.length} items)</h1>
            </div>
            
            <div className="cart-items">
                {cartItems.map((item) => (
                    <div key={item.id} className="cart-item">
                        <div className="cart-item-image">
                            <img src={item.images[0]} alt={item.title} />
                        </div>
                        <div className="cart-item-details">
                            <h2 className="font-bold text-xl">{item.title}</h2>
                            <p className="text-gray-600">{item.description}</p>
                            <div className="cart-item-price">
                                <span className="font-bold text-[#f0a14c]">${item.price}</span>
                                <div className="quantity-controls">
                                    <button
                                        className="quantity-btn"
                                        onClick={() => handleDecrement(item)}
                                    >
                                        <RemoveIcon />
                                    </button>
                                    <span className="quantity">{item.quantity}</span>
                                    <button
                                        className="quantity-btn"
                                        onClick={() => handleIncrement(item)}
                                    >
                                        <AddIcon />
                                    </button>
                                </div>
                            </div>
                            <div className="item-total">
                                <span>Total: </span>
                                <span className="font-bold">${(item.price * item.quantity).toFixed(2)}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            
            <div className="cart-summary">
                <div className="cart-total">
                    <span>Total:</span>
                    <span className="font-bold text-xl">${cartTotal.toFixed(2)}</span>
                </div>
                <div className="cart-actions">
                    <Link to="/products">
                        <button className="continue-shopping-btn">
                            Continue Shopping
                        </button>
                    </Link>
                    <Link to="/checkout">
                        <button className="checkout-btn">
                            <ShoppingCartCheckoutIcon /> Proceed to Checkout
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Cart;