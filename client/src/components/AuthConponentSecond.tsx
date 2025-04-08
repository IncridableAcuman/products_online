import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Product } from '../hooks/Product';
import { toast } from 'react-toastify';
import axiosAPI from '../api/axiosAPI';
const AuthConponentSecond = () => {
  const [productData,setProductData]=useState<Product[]>([]);
  const navigate=useNavigate();
  const handleProductData = async ()=>{
    try {
      const {data}:{data:Product[]} = await axiosAPI.get("/product/all-products");
      setProductData(data);
    } catch (error) {
      toast.error("Something went wrong");
      console.log(error);
    }
  }
  useEffect(()=>{
    handleProductData();
  },[]);
  return (
    <>
   <div className="container mx-auto px-4 py-8">
      {/* Sarlavha va tavsif */}
      {/* Grid tizimi */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {productData.map((product, index) => (        
          <div
            key={index}
            className="product-card bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300"
            onClick={()=>navigate(`/product/${product.id}`)}
          >
            {/* Rasm qismi */}
            <div className="product-card-image">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-56 object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
            {/* Kontent qismi */}
            <div className="product-card-content p-4">
              <h2 className="text-lg font-medium text-gray-800 mb-2">
                {product.name.slice(0, 27)}
              </h2>
              <p className="text-gray-500 text-lg font-semibold">${product.price}</p>
            </div>
          </div>  
        ))}
      </div>
    </div>
    </>
  )
}

export default AuthConponentSecond