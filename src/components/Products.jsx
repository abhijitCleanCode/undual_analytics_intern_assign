import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { fetchAllCategories, fetchAllProduct, fetchProductByCategory } from '../services/api';
import { useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setProducts, appendProducts, selectedCategory } from '../store/productSlice';
import Loader from './Loader';

const Products = () => {
  const dispatch = useDispatch();
  const [productCategory, setProductCategory] = useState([]);
  const [animateCard, setAnimateCard] = useState({ y: 0, opacity: 1 });
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const products = useSelector((state) => state.product.products);
  const chosenCategory = useSelector((state) => state.product.selectedCategory);

  const [searchParams, setSearchParams] = useSearchParams();
  const [category, setCategory] = useState(searchParams.get('category') || '');
  const [inputText, setInputText] = useState(searchParams.get('search') || '');

  useEffect(() => {}, [category, inputText]);

  const loadProducts = async (limit, skip) => {
    try {
      const response = await fetchAllProduct(limit, skip);
      return response.products;
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error;
    }
  };

  // Fetch initial products when the component mounts
  useEffect(() => {
    const getAllProduct = async () => {
      setLoading(true);
      try {
        const initialProducts = await loadProducts(10, 0);
        dispatch(setProducts(initialProducts));
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };

    getAllProduct();
  }, [dispatch]);

  // Fetch product categories
  useEffect(() => {
    const getAllCategories = async () => {
      try {
        const response = await fetchAllCategories();
        setProductCategory(response);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    getAllCategories();
  }, []);

  // Handle category selection and load products based on the selected category
  const selectCategory = async (categorySlug) => {
    setLoading(true);
    try {
      const productsByCategory = await fetchProductByCategory(categorySlug);
      console.log(productsByCategory.products);
      dispatch(setProducts(productsByCategory.products));
      dispatch(selectedCategory(categorySlug));
      setPage(1);
      setLoading(false);
    } catch (error) {
      console.error('Error in selectCategory:', error);
      setLoading(false);
    }
  };
  // Handle search term change
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    const text = e.target.value;
    setInputText(text);

    setSearchParams({ category, search: text });
    if (e.target.value === '') {
      dispatch(setProducts(products));
      selectCategory(null);
    }
  };

  // Handle searching by category using search term
  useEffect(() => {
    if (searchTerm.length > 0) {
      const filteredCategory = productCategory.find((category) =>
        category.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      if (filteredCategory) {
        selectCategory(filteredCategory.slug);
      }
    }

    if (searchTerm.length === 0) {
      selectCategory(null);
    }
  }, [searchTerm, productCategory, searchTerm.length]);

  // Handle infinite scrolling
  const handleInfiniteScroll = async () => {
    if (window.innerHeight + document.documentElement.scrollTop + 1 >= document.documentElement.scrollHeight && !loading) {
      setLoading(true);
      const newPage = page + 1;
      const skip = (newPage - 1) * 10;

      try {
        const nextBatchOfProducts = await loadProducts(10, skip);
        dispatch(appendProducts(nextBatchOfProducts));
        setPage(newPage);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.error('Error fetching more products:', error);
      }
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleInfiniteScroll);

    return () => {
      window.removeEventListener('scroll', handleInfiniteScroll);
    };
  }, [products, page, loading]);

  return (
    <>
      <h2 className='text-[2.75rem] font-[800] text-center color-black capitalize'>
        Our <span className='text-[5rem] text-[2.5rem] md:text-[5rem] text-secondary'>Product</span> section
      </h2>

      {/* Search Bar */}
      <div className='flex justify-center items-center mb-4'>
        <input
          type='text'
          value={searchTerm}
          onChange={handleSearch}
          placeholder='Search by category...'
          className='p-2 border rounded-md w-[80%] md:w-[50%] lg:w-[40%] border-2 border-[#313bac] focus:border-[#313bac] focus:outline-none'
        />
      </div>

      {/* Display product categories */}
      <div className='flex flex-row justify-center items-center flex-wrap mt-[4rem] mb-0 mx-[2rem]'>
        {productCategory.map((item, index) => (
          <div
            key={index}
            onClick={() => selectCategory(item.slug)}
            className={`m-[0.5rem] py-[0.5rem] px-[1rem] rounded-[10px] bg-white text-black font-[800] cursor-pointer transition-all delay-150 ease-in-out hover:bg-secondary hover:text-white flex justify-center items-center text-center capitalize`}
          >
            {item.name}
          </div>
        ))}
      </div>

      {chosenCategory && (
        <h2 className='text-[2.75rem] font-[800] text-center color-black capitalize'>{chosenCategory}</h2>
      )}

      {/* Display products */}
      <motion.div
        animate={animateCard}
        transition={{ duration: 0.5, delayChildren: 0.5 }}
        className='flex flex-wrap justify-center items-center'
      >
        {products?.map((item, index) => (
          <motion.div
            key={index}
            className='flex flex-col justify-center items-center m-[2rem] p-[1rem] rounded-[0.5rem] bg-primary text-[#000] cursor-pointer shadow-md w-full md:w-[470px] md:p-[1.25rem] md:rounded-[0.75rem]'
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              type: 'spring',
              stiffness: 300,
              damping: 20,
              delay: 0.5,
            }}
          >
            <div className='flex justify-center items-center w-full h-[230px] md:h-[350px] relative'>
              {loading ? (<Loader />) :
                (<motion.img
                  src={item.images[0]}
                  alt={item.name}
                  className='w-full h-full rounded-[0.5rem] object-cover'
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.3 }}
                />)}
            </div>

            <motion.div
              className='p-[0.5rem] w-full relative flex flex-col justify-center items-center'
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: {
                    delayChildren: 0.5,
                    staggerChildren: 0.3
                  }
                }
              }}
            >
              <motion.h3
                className='text-[2.75rem] font-[800] text-center color-black capitalize leading-10 mt-[1rem] md:mt-[3rem]'
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                {item.title}
              </motion.h3>

              <motion.p
                className='text-[1.75rem] md:text-[0.8rem] text-left text-gray leading-6 pt-2'
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
              >
                {item.description}
              </motion.p>

              <div className='absolute py-[0.5rem] px-[1rem] rounded-[10px] bg-white -top-[25px] flex justify-center items-center'>
                <p className="text-[1.75rem] md:text-[0.8rem] text-left text-gray leading-6">{item.category}</p>
              </div>
            </motion.div>
          </motion.div>
        ))}
      </motion.div>

      {loading && <Loader />}
    </>
  );
};

export default Products;
