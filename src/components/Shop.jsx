import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { Triangle } from "react-loader-spinner";
import { API_URL, IMAGE_SETTING, TOAST_CONFIG, TRIANGLE_LOADER_CONFIG } from "../../config";
import Pagination from "./Pagination";

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(null);

  // ! Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 8;

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentProducts = products.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  }

  const previousPage = () => {
    if(currentPage !== 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const nextPage = () => {
    if(currentPage !== Math.ceil(products.length / postsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  // ! End of Pagination
  
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${API_URL}api/products`);
        if (response.data) {
          setProducts(response.data);
          setInterval(() => {
            setLoading(false);
          }, [1000]);
        }
      } catch (error) {
        console.log(error.message);
        toast.error(error.message, TOAST_CONFIG);
        navigate("/error");
      }
    };
    
    fetchProducts();
  }, []);
  

  return (
    <>
      {loading ? (
        <div className="flex justify-center items-center text-center">
          <Triangle {...TRIANGLE_LOADER_CONFIG} />
        </div>
      ) : (
        <section className="text-customText body-font">
          <div className="container px-5 py-24 pb-6 mx-auto">
            <div className="flex flex-wrap -m-4">
              {currentProducts.map((product) => {
                return (
                  <Link
                    key={product._id}
                    to={`/shop/${product._id}`}
                    className="lg:w-1/4 md:w-1/2 p-4 w-full"
                  >
                    <div className="block relative h-48 rounded overflow-hidden">
                      <div
                        className="object-cover object-center w-full h-full block"
                        style={{
                          backgroundImage: `url(${product.image}${IMAGE_SETTING})`,
                          filter: "blur(5px)",
                          transition: "filter 0.5s ease",
                        }}
                      ></div>
                      <img
                        alt="ecommerce"
                        className="object-cover object-center w-full h-full block absolute top-0 left-0 opacity-0"
                        src={`${product.image}${IMAGE_SETTING}`}
                        onLoad={(e) => {
                          e.target.style.opacity = 1;
                          e.target.previousSibling.style.filter = "none";
                        }}
                      />
                    </div>
                    <div className="mt-4">
                      <h3 className="text-customText text-xs tracking-widest title-font mb-1">
                        {product.category.toUpperCase()}
                      </h3>
                      <h2 className="text-customHeading title-font text-lg font-medium">
                        {product.name}
                      </h2>
                      <p className="mt-1 productPrice">${product.price}</p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
          { products && <Pagination postsPerPage={postsPerPage} totalPosts={products.length} paginate={paginate} previousPage={previousPage} nextPage={nextPage} currentPage={currentPage} />}
        </section>
      )}
    </>
  );
};

export default Shop;
