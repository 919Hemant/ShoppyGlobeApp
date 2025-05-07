import { useState, useEffect } from 'react';

/**
 * Custom hook for fetching product details from the API
 * @param {string} productId - The ID of the product to fetch
 * @returns {Object} - Object containing product details, loading state, and error state
 */
const useProductDetails = (productId) => {
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Don't fetch if no product ID provided
    if (!productId) {
      setIsLoading(false);
      return;
    }

    const fetchProductDetails = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`https://dummyjson.com/products/${productId}`);
        
        // Check if response is successful
        if (!response.ok) {
          throw new Error(`Failed to fetch product: ${response.status} ${response.statusText}`);
        }
        
        const data = await response.json();
        
        // If product not found or invalid data
        if (!data || data.message === "Product not found") {
          throw new Error('Product not found');
        }
        
        setProduct(data);
        setError(null);
      } catch (err) {
        console.error(`Error fetching product ${productId}:`, err);
        setError(err.message || 'Failed to fetch product details');
        setProduct(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProductDetails();
  }, [productId]); // Re-fetch when product ID changes

  return { product, isLoading, error };
};

export default useProductDetails; 