import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { Triangle } from "react-loader-spinner";
import { API_URL, IMAGE_SETTING } from "../../config";

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(null);
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
        toast.error(error.message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          progress: undefined,
          theme: "light",
        });
        navigate("/error");
      }
    };

    fetchProducts();
  }, []);

  return (
    <>
      {loading ? (
        <div className="flex justify-center items-center text-center">
          <Triangle
            height={565}
            width={300}
            color="lightblue"
            ariaLabel="triangle-loading"
            wrapperStyle={{}}
            visible={true}
          />
        </div>
      ) : (
        <section className="text-gray-600 body-font">
          <div className="container px-5 py-24 mx-auto">
            <div className="flex flex-wrap -m-4">
              {products.map((product) => {
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
                      <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">
                        {product.category.toUpperCase()}
                      </h3>
                      <h2 className="text-gray-900 title-font text-lg font-medium">
                        {product.name}
                      </h2>
                      <p className="mt-1">${product.currentPrice}</p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default Shop;
