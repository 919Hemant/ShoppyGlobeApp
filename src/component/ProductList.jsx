import { useState } from "react";
import './ProductList.css';
import { Link } from "react-router-dom";
import StarsIcon from '@mui/icons-material/Stars';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import InfoIcon from '@mui/icons-material/Info';
import { useDispatch } from "react-redux";
import { addItem } from "../utils/cartSlice";
import useProductList from "../utils/useProductList";
import CircularProgress from '@mui/material/CircularProgress';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import FilterListIcon from '@mui/icons-material/FilterList';

/**
 * ProductList component displays all products with search functionality
 * @returns {JSX.Element} The ProductList component
 */
function ProductList() {
    // Use our custom hook for product data
    const { products, isLoading, error, searchProducts, filterByCategory, currentCategory } = useProductList();
    const [searchTerm, setSearchTerm] = useState('');
    const dispatch = useDispatch();

    /**
     * Handle search input changes
     * @param {Object} e - Event object
     */
    const handleSearchChange = (e) => {
        const searchText = e.target.value;
        setSearchTerm(searchText);
        searchProducts(searchText);
    };

    /**
     * Add product to cart
     * @param {Object} item - Product to add to cart
     */
    const handleAddToCart = (item) => {
        dispatch(addItem(item));
    };

    /**
     * Filter by category
     * @param {string} category - Category to filter by
     */
    const handleCategoryFilter = (category) => {
        // If clicking the already selected category, clear it
        if (category === currentCategory) {
            filterByCategory('');
        } else {
            filterByCategory(category);
        }
    };

    // Get unique categories from products
    const allProducts = isLoading ? [] : products;
    const categories = allProducts.length > 0 
        ? [...new Set(allProducts.map(product => product.category))]
        : [];

    // Display loading state
    if (isLoading) {
        return (
            <div className="loading-container">
                <CircularProgress color="warning" />
                <p>Loading products...</p>
            </div>
        );
    }

    // Display error state
    if (error) {
        return (
            <div className="error-container">
                <ErrorOutlineIcon className="error-icon" />
                <h2>Something went wrong</h2>
                <p>{error}</p>
                <button 
                    className="retry-button"
                    onClick={() => window.location.reload()}
                >
                    Try Again
                </button>
            </div>
        );
    }

    return (
        <div className="product-list-container">
            <h1 className="products-heading">Our Products</h1>
            
            <div className="search-and-filter">
                <div className="search-container">
                    <div className="search-input-container">
                        <input 
                            type="text" 
                            value={searchTerm}
                            onChange={handleSearchChange}
                            placeholder="Search products by name, category, or brand" 
                            className="search-input"
                        />
                        <SearchIcon className="search-icon" />
                    </div>
                </div>
                
                {categories.length > 0 && (
                    <div className="category-filter">
                        <div className="filter-label">
                            <FilterListIcon /> Filter by:
                        </div>
                        <div className="category-buttons">
                            {categories.map(category => (
                                <button
                                    key={category}
                                    onClick={() => handleCategoryFilter(category)}
                                    className={`category-button ${currentCategory === category ? 'active' : ''}`}
                                >
                                    {category}
                                </button>
                            ))}
                        </div>
                    </div>
                )}
            </div>
            
            {products.length === 0 ? (
                <div className="no-results">
                    <h2>No products found</h2>
                    <p>Try adjusting your search criteria</p>
                </div>
            ) : (
                <div className="product-container">
                    {products.map((product) => (
                        <div className="product-card" key={product.id}>
                            <span className="product-category">{product.category}</span>
                            {product.discountPercentage > 0 && (
                                <span className="discount-badge">-{Math.round(product.discountPercentage)}%</span>
                            )}
                            
                            <div className="product-image-container">
                                <img src={product.images[0]} alt={product.title} className="product-image" />
                                <div className="product-actions">
                                    <button 
                                        onClick={() => handleAddToCart(product)}
                                        className="product-action-button cart-button"
                                        title="Add to cart"
                                    >
                                        <ShoppingCartIcon />
                                    </button>
                                    <Link to={`/product/${product.id}`} className="product-action-button details-button" title="View details">
                                        <InfoIcon />
                                    </Link>
                                </div>
                            </div>
                            
                            <div className="product-info">
                                <h3 className="product-title">{product.title}</h3>
                                <div className="product-rating">
                                    <StarsIcon className="star-icon" /> 
                                    <span>{product.rating}</span>
                                </div>
                                <p className="product-description">{product.description.substring(0, 80)}...</p>
                                <div className="product-price">
                                    <span className="current-price">${product.price}</span>
                                    {product.discountPercentage > 0 && (
                                        <span className="original-price">
                                            ${Math.round(product.price / (1 - product.discountPercentage/100))}
                                        </span>
                                    )}
                                </div>
                                <div className="product-buttons">
                                    <button 
                                        onClick={() => handleAddToCart(product)}
                                        className="add-to-cart-btn"
                                    >
                                        Add to cart
                                    </button>
                                    <Link to={`/product/${product.id}`} className="view-details-btn">
                                        Details
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default ProductList;