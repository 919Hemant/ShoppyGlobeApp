import { useState, useEffect } from 'react';

/**
 * Custom hook for fetching product list from the API
 * @returns {Object} - Object containing product list, loading state, error state, and search functionality
 */
const useProductList = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentSearchTerm, setCurrentSearchTerm] = useState('');
  const [currentCategory, setCurrentCategory] = useState('');
  
  // Products to exclude - add titles here that you want to remove from the list
  const excludedProducts = ['chicken', 'kiwi'];

  // Fetch products from API
  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        const response = await fetch('https://dummyjson.com/products');
        
        // Check if response is successful
        if (!response.ok) {
          throw new Error(`Failed to fetch products: ${response.status} ${response.statusText}`);
        }
        
        const data = await response.json();
        
        // Filter out excluded products
        const filteredData = data.products ? data.products.filter(product => 
          !excludedProducts.some(term => 
            product.title.toLowerCase().includes(term.toLowerCase())
          )
        ) : [];
        
        setProducts(filteredData);
        setFilteredProducts(filteredData);
        setError(null);
      } catch (err) {
        console.error('Error fetching products:', err);
        setError(err.message || 'Failed to fetch products');
        setProducts([]);
        setFilteredProducts([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  /**
   * Apply both search term and category filters
   */
  const applyFilters = () => {
    let result = [...products];
    
    // Apply search term filter if exists
    if (currentSearchTerm.trim()) {
      const lowerCaseSearch = currentSearchTerm.toLowerCase();
      result = result.filter(
        (product) => 
          (product.title?.toLowerCase() || '').includes(lowerCaseSearch) || 
          (product.description?.toLowerCase() || '').includes(lowerCaseSearch) ||
          (product.category?.toLowerCase() || '').includes(lowerCaseSearch) ||
          (product.brand?.toLowerCase() || '').includes(lowerCaseSearch)
      );
    }
    
    // Apply category filter if exists
    if (currentCategory) {
      result = result.filter(
        (product) => product.category === currentCategory
      );
    }
    
    setFilteredProducts(result);
  };

  /**
   * Filter products by search text
   * @param {string} searchText - Text to search for in product title or description
   */
  const searchProducts = (searchText) => {
    setCurrentSearchTerm(searchText);
    applyFilters();
  };

  /**
   * Filter products by category
   * @param {string} category - Category to filter products by
   */
  const filterByCategory = (category) => {
    setCurrentCategory(category);
    applyFilters();
  };

  // Apply filters whenever search term or category changes
  useEffect(() => {
    applyFilters();
  }, [currentSearchTerm, currentCategory]);

  return {
    products: filteredProducts,
    isLoading,
    error,
    searchProducts,
    filterByCategory,
    currentCategory
  };
};

export default useProductList; 