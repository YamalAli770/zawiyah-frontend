import React from "react";

const ListProduct = () => {
  return (
    <section className="text-gray-600 body-font overflow-hidden">
      <div className="container px-5 py-24 mx-auto">
        <div className="lg:w-4/5 mx-auto flex flex-wrap">
          <div className="lg:w-1/2 w-full lg:pr-10 lg:py-6 mb-6 lg:mb-0">
            {/* Brand  */}
            <div>
              <label
                htmlFor="Brand"
                className="block text-sm font-medium leading-6 text-gray-900"
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
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-2"
                />
              </div>
            </div>
            {/* Title */}
            <div className="mt-2 mb-2">
              <label
                htmlFor="title"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Title
              </label>
              <div className="mt-2">
                <input
                  id="title"
                  name="title"
                  type="text"
                  autoComplete="title"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-2"
                />
              </div>
            </div>
            {/* Description */}
            <div className="inline">
              <label
                htmlFor="description"
                className="block text-sm font-medium leading-6 text-gray-900"
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
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-2"
                />
              </div>
            </div>
            {/* Color */}
            <div className="mt-2 mb-2">
              <label
                htmlFor="color"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Color
              </label>
              <div className="mt-2">
                <input
                  id="color"
                  name="color"
                  type="text"
                  autoComplete="color"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-2"
                />
              </div>
            </div>
            {/* Size */}
            <div>
              <label
                htmlFor="size"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Size
              </label>
              <div className="mt-2">
                <input
                  id="size"
                  name="size"
                  type="text"
                  autoComplete="size"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-2"
                />
              </div>
            </div>
            {/* Image */}
            <div className="mt-2">
              <label
                htmlFor="image"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Image
              </label>
              <div className="mt-2">
                <input
                  id="size"
                  name="size"
                  type="file"
                  autoComplete="size"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-2"
                />
              </div>
            </div>
            <div className="flex mt-5 items-end">
              {/* Price */}
              <div>
                <label
                  htmlFor="price"
                  className="block text-sm font-medium leading-6 text-gray-900 mb-1"
                >
                  Price
                </label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  className="block rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-
                indigo-600 sm:text-sm sm:leading-6 p-2"
                />
              </div>
              <button className="flex ml-auto text-white bg-customButton border-0 py-2 px-6 focus:outline-none hover:brightness-50 rounded h-max">
                List Now
              </button>
            </div>
          </div>
          <img
            alt="ecommerce"
            className="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded"
            src="https://images.unsplash.com/photo-1675635425432-224e15ee6703?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTA2fHxoYW5kaWNyYWZ0c3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=600&q=60"
          />
        </div>
      </div>
    </section>
  );
};

export default ListProduct;
