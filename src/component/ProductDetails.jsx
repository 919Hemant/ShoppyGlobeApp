import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import './ProductDetail.css';
import { addItem } from "../utils/cartSlice";
import useProductDetails from "../utils/useProductDetails";
import CircularProgress from '@mui/material/CircularProgress';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { Link } from "react-router-dom";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

/**
 * ProductDetails component to display detailed information about a product
 * @returns {JSX.Element} The ProductDetails component
 */
function ProductDetails() {
    const { id } = useParams();
    const { product, isLoading, error } = useProductDetails(id);
    const dispatch = useDispatch();
    
    /**
     * Add product to cart
     * @param {Object} item - Product to add to cart
     */
    const handleAddToCart = (item) => {
        dispatch(addItem(item));
    };

    // Display loading state
    if (isLoading) {
        return (
            <div className="loading-container">
                <CircularProgress color="warning" />
                <p>Loading product details...</p>
            </div>
        );
    }

    // Display error state
    if (error || !product) {
        return (
            <div className="error-container">
                <ErrorOutlineIcon className="error-icon" />
                <h2>Something went wrong</h2>
                <p>{error || "Product not found"}</p>
                <div className="error-buttons">
                    <Link to="/products">
                        <button className="back-button">
                            <ArrowBackIcon /> Back to Products
                        </button>
                    </Link>
                    <button 
                        className="retry-button"
                        onClick={() => window.location.reload()}
                    >
                        Try Again
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="product-details-wrapper">
            <div className="navigation-links">
                <Link to="/products" className="back-link">
                    <ArrowBackIcon /> Back to Products
                </Link>
            </div>
            
            <div className="product-detail-container">
                <div className="product-image-container">
                    <img 
                        src={product.images[0]} 
                        alt={product.title} 
                        className="product-image" 
                    />
                    {product.discountPercentage > 0 && (
                        <div className="discount-badge">
                            {product.discountPercentage}% OFF
                        </div>
                    )}
                </div>
                
                <div className="product-info-container">
                    <h1 className="product-title">{product.title}</h1>
                    <p className="product-description">{product.description}</p>
                    
                    <div className="product-price-container">
                        <div className="price-display">
                            <span className="price-label">Price:</span>
                            <span className="price-amount">${product.price}</span>
                            {product.discountPercentage > 0 && (
                                <span className="original-price">
                                    ${Math.round(product.price / (1 - product.discountPercentage/100))}
                                </span>
                            )}
                        </div>
                        
                        <button 
                            onClick={() => handleAddToCart(product)}
                            className="add-to-cart-button"
                        >
                            <ShoppingCartIcon /> Add to Cart
                        </button>
                    </div>
                    
                    <div className="product-meta">
                        <div className="meta-item">
                            <span className="meta-label">Brand:</span>
                            <span className="meta-value">{product.brand}</span>
                        </div>
                        <div className="meta-item">
                            <span className="meta-label">Category:</span>
                            <span className="meta-value">{product.category}</span>
                        </div>
                        <div className="meta-item">
                            <span className="meta-label">Rating:</span>
                            <span className="meta-value rating">{product.rating} / 5</span>
                        </div>
                        <div className="meta-item">
                            <span className="meta-label">Stock:</span>
                            <span className={`meta-value stock ${product.stock < 10 ? 'low-stock' : ''}`}>
                                {product.stock} {product.stock < 10 ? '(Low Stock)' : 'Available'}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            
            <div className="product-additional-info">
                <h2 className="section-title">Product Specifications</h2>
                <div className="specifications-grid">
                    {Object.entries(product)
                        .filter(([key]) => 
                            !['id', 'title', 'description', 'price', 'images', 'thumbnail'].includes(key))
                        .map(([key, value]) => {
                            // Format the display value based on its type
                            let displayValue;
                            if (typeof value === 'boolean') {
                                displayValue = value ? 'Yes' : 'No';
                            } else if (typeof value === 'object' && value !== null) {
                                // For objects, create a formatted display instead of raw JSON
                                if (Array.isArray(value)) {
                                    displayValue = value.join(', ');
                                } else {
                                    // Create a list of object properties
                                    displayValue = (
                                        <ul className="object-properties">
                                            {Object.entries(value).map(([subKey, subValue]) => (
                                                <li key={subKey}>
                                                    <strong>{subKey}:</strong> {
                                                        typeof subValue === 'object' && subValue !== null 
                                                            ? JSON.stringify(subValue) 
                                                            : String(subValue)
                                                    }
                                                </li>
                                            ))}
                                        </ul>
                                    );
                                }
                            } else {
                                displayValue = value;
                            }
                            
                            return (
                                <div className="spec-item" key={key}>
                                    <span className="spec-label">{key.charAt(0).toUpperCase() + key.slice(1)}</span>
                                    <span className="spec-value">
                                        {displayValue}
                                    </span>
                                </div>
                            );
                        })}
                </div>
            </div>
        </div>
    );
}

export default ProductDetails;