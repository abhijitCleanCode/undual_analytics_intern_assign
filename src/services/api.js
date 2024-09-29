import axios from "axios";

const baseURL = "https://dummyjson.com";

// Create an axios Instance with default configuration which remain same for all request made using this instance 
const axiosInstance = axios.create({
    baseURL,

    headers: {
        'Content-Type': 'application/json'
    }
});

export const fetchAllProduct = async (limit = 10, skip = 0) => {
    try {
        // Use limit and skip parameters for pagination
        const response = await axiosInstance.get(`https://dummyjson.com/products?limit=${limit}&skip=${skip}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching all products:', error);
        throw error;
    }
};

export const fetchAllCategories = async () => {
    try {
        const response = await axiosInstance.get(`https://dummyjson.com/products/categories`);
        return response.data;
    } catch (error) {
        console.error('Error fetching categories:', error);
        throw error;
    }
}

export const fetchProductByCategory = async (categorySlug, limit = 0, skip = 0) => {
    try {
      const response = await axiosInstance.get(`https://dummyjson.com/products/category/${categorySlug}?limit=${limit}&skip=${skip}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching products by category:', error);
      throw error;
    }
  };
  