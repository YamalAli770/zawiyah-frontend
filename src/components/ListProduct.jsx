import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { API_URL, TOAST_CONFIG, TRIANGLE_LOADER_CONFIG } from "../../config";
import { uploadFile } from '@uploadcare/upload-client'
import { Triangle } from "react-loader-spinner";
import { useStore } from '../store';

const ListProduct = () => {
  const user = useStore((state) => state.user);
  const [imageUploading, setImageUploading] = useState(false);
  const navigate = useNavigate();
  const [productData, setProductData] = useState({
    brand: "",
    name: "",
    category: "",
    description: "",
    color: "",
    size: "",
    price: "",
  });

  const [image, setImage] = useState(null);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setProductData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageChange = async (event) => {
    const file = event.target.files[0];
    if(file.size > 1024 * 1024 * 10) {
      toast.error("Image size should be less than 10MB", TOAST_CONFIG);
      return;
    };
    if(file.type !== 'image/jpeg' && file.type !== 'image/png') {
      toast.error("Image format is incorrect. Only JPG and PNG are allowed", TOAST_CONFIG);
      return;
    };
    setImageUploading(true);
    const result = await uploadFile(file, { publicKey: 'e7622d60287398e37912', store: 'auto' })
    if(result) {
      setImage(result.cdnUrl);
      setImageUploading(false);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("brand", productData.brand);
    formData.append("name", productData.name);
    formData.append("category", productData.category);
    formData.append("description", productData.description);
    formData.append("color", productData.color);
    formData.append("size", productData.size);
    formData.append("initialPrice", productData.price);
    formData.append("image", image);


    try {
      console.log(user)
      const response = await axios.post(`${API_URL}api/products/create`, formData, {
        headers: {
          Authorization: 'Bearer ' + user.accessToken,
        },
      });
      if(response.data) {
        toast.success("Product created successfully", TOAST_CONFIG);
      }

      // Reset the form after successful login
      setProductData({
        brand: "",
        title: "",
        description: "",
        color: "",
        size: "",
        price: "",
      });
      setImage(null);

      // Redirect to the desired page after successful login
      navigate("/shop");

    } catch (error) {
      toast.error(error.response.data.message, TOAST_CONFIG);
    }
  };

  return (
    <section className="text-customText body-font overflow-hidden">
      <div className="container px-5 py-24 mx-auto">
        <div className="lg:w-4/5 mx-auto flex flex-wrap">
          <form onSubmit={handleSubmit} className="lg:w-1/2 w-full lg:pr-10 lg:py-6 mb-6 lg:mb-0">
            {/* Brand  */}
            <div>
              <label
                htmlFor="brand"
                className="block text-sm font-medium leading-6"
              >
                Brand
              </label>
              <div className="mt-2">
                <input
                  id="brand"
                  name="brand"
                  type="text"
                  autoComplete="brand"
                  required
                  value={productData.brand}
                  onChange={handleInputChange}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-2"
                />
              </div>
            </div>
            {/* Name */}
            <div className="mt-2 mb-2">
              <label
                htmlFor="name"
                className="block text-sm font-medium leading-6"
              >
                Name
              </label>
              <div className="mt-2">
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  value={productData.name}
                  onChange={handleInputChange}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-2"
                />
              </div>
            </div>
            {/* Category  */}
            <div className="inline">
              <label
                htmlFor="category"
                className="block text-sm font-medium leading-6"
              >
                Category
              </label>
              <div className="mt-2 mb-2">
                <input
                  id="category"
                  name="category"
                  type="text"
                  autoComplete="category"
                  required
                  value={productData.category}
                  onChange={handleInputChange}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-2"
                />
              </div>
            </div>
            {/* Description */}
            <div className="inline">
              <label
                htmlFor="description"
                className="block text-sm font-medium leading-6"
              >
                Description
              </label>
              <div className="mt-2">
                <textarea
                  rows={6}
                  id="description"
                  name="description"
                  type="text"
                  autoComplete="description"
                  required
                  value={productData.description}
                  onChange={handleInputChange}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-2"
                />
              </div>
            </div>
            {/* Color */}
            <div className="mt-2 mb-2">
              <label
                htmlFor="color"
                className="block text-sm font-medium leading-6"
              >
                Color
              </label>
              <div className="mt-2">
                <input
                  id="color"
                  name="color"
                  type="text"
                  autoComplete="color"
                  value={productData.color}
                  onChange={handleInputChange}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-2"
                />
              </div>
            </div>
            {/* Size */}
            <div>
              <label
                htmlFor="size"
                className="block text-sm font-medium leading-6"
              >
                Size
              </label>
              <div className="mt-2">
                <input
                  id="size"
                  name="size"
                  type="text"
                  autoComplete="size"
                  value={productData.size}
                  onChange={handleInputChange}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-2"
                />
              </div>
            </div>
            {/* Image */}
            <div className="mt-2">
              <label
                htmlFor="image"
                className="block text-sm font-medium leading-6"
              >
                Image
              </label>
              <div className="mt-2">
                <input
                  id="image"
                  name="image"
                  type="file"
                  autoComplete="image"
                  required
                  value={productData.image}
                  onChange={handleImageChange}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-2"
                />
              </div>
              <span className="text-red-600 text-xs">Only JPG, JPEG and PNG Supported (Max Size: 10MB)</span>
            </div>
            <div className="flex mt-5 items-end">
              {/* Price */}
              <div>
                <label
                  htmlFor="price"
                  className="block text-sm font-medium leading-6 mb-1"
                >
                  Price
                </label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  autoComplete="price"
                  required
                  value={productData.price}
                  onChange={handleInputChange}
                  className="block rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-
                indigo-600 sm:text-sm sm:leading-6 p-2"
                />
              </div>
              <button type="submit" className="flex ml-auto text-customButtonText bg-customButtonBg border-0 py-2 px-6 focus:outline-none hover:brightness-50 rounded h-max">
                List Now
              </button>
            </div>
          </form>
          { !imageUploading ? image && <img
            alt="ecommerce"
            className="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded"
            src={image + '-/quality/smart/-/format/auto/'}
          /> : <div className="flex justify-center items-center text-center w-6/12">
          <Triangle {...TRIANGLE_LOADER_CONFIG} width={150} height={150} />
        </div>}
        </div>
      </div>
    </section>
  );
};

export default ListProduct;
