import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-scroll";
import { ChevronDoubleUpIcon } from "@heroicons/react/solid";

import Addproduct from "./addproduct";
function Tables() {
  const [Product, setProduct] = useState([]);
  const [dropdown, setdropdown] = useState([]);
  const [loading, setloading] = useState(false);
  const [loadingaction, setloadingaction] = useState(false);
  const [loadingtable, setloadingtable] = useState(false);
  const [update, setupdate] = useState("0");
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.scrollY > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  useEffect(() => {
    const getdata = async () => {
      const response = await fetch("/api/products");
      const result = await response.json();
      setProduct(result.Products);
      setloadingtable(false);
    };
    getdata();
  }, [update]);

  const handelsearch = async (e) => {
    let search = e.target.value;

    if (search.length > 2) {
      setloading(true);
      setdropdown([]);
      await fetch(`/api/search?query=${search}`)
        .then(async (response) => await response.json())
        .then((data) => {
          setdropdown(data.Products);
          // console.log(data.Products);
        });
      setloading(false);
    }
    if (search.length <= 2) {
      setdropdown([]);
    }
  };

  const Changequantity = async (slug, action, initialquantity) => {
    // console.log(slug, action);
    setloadingaction(true);
    const index = Product.findIndex((product) => product.slug === slug);
    const index2 = dropdown.findIndex((product) => product.slug === slug);
    let product_item = Product[index];
    let dropdown_item = dropdown[index2];

    // set produt item1s quntity to quantity +1
    if (action === "plus") {
      product_item.quantity = parseInt(product_item.quantity) + 1;
      dropdown_item.quantity = parseInt(dropdown_item.quantity) + 1;
    } else if (action === "minus") {
      product_item.quantity = parseInt(product_item.quantity) - 1;
      dropdown_item.quantity = parseInt(dropdown_item.quantity) - 1;
    }

    try {
      const response = await fetch("/api/action", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ slug, action, initialquantity }),
      });
      if (response.ok) {
        // console.log("Product updated successfully.");
        // Optionally, you can reset the form fields here
      } else {
        console.error("Failed to add product.");
        const errorData = await response.json();
        console.error("Error:", errorData);
      }
    } catch (error) {
      console.error("Error:", error);
    }
    setloadingaction(false);
  };

  return (
    <>
      <div
        name="section2"
        className="container mx-auto border-b bg-gray-100 max-w-7xl rounded-lg mb-2"
      >
        <div className="flex flex-col mb-2 ">
          <div className="flex flex-row mb-1 sm:mb-0 justify-between w-full">
            <h1 className="text-3xl pl-4 pt-3 font-bold leading-tight mb-4">
              Search Products
            </h1>
          </div>
          <div className="relative px-4 pb-4">
            <input
              onChange={handelsearch}
              type="text"
              placeholder="Name search (3+ chars)"
              className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
            <div className="absolute inset-y-0 right-0 flex items-center mb-5 pr-6 ">
              <svg
                className="h-5 w-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-4.35-4.35M11 19a8 8 0 110-16 8 8 0 010 16z"
                ></path>
              </svg>
            </div>
          </div>
        </div>
      </div>
      {loading && (
        <div className="container mx-auto justify-center items-center h-28 w-28">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
            <circle
              fill="#4C33FF"
              stroke="#4C33FF"
              strokeWidth="2"
              r="10"
              cx="40"
              cy="65"
            >
              <animate
                attributeName="cy"
                calcMode="spline"
                dur="2"
                values="65;135;65;"
                keySplines=".5 0 .5 1;.5 0 .5 1"
                repeatCount="indefinite"
                begin="-.4"
              ></animate>
            </circle>
            <circle
              fill="#4C33FF"
              stroke="#4C33FF"
              strokeWidth="2"
              r="10"
              cx="100"
              cy="65"
            >
              <animate
                attributeName="cy"
                calcMode="spline"
                dur="2"
                values="65;135;65;"
                keySplines=".5 0 .5 1;.5 0 .5 1"
                repeatCount="indefinite"
                begin="-.2"
              ></animate>
            </circle>
            <circle
              fill="#4C33FF"
              stroke="#4C33FF"
              strokeWidth="2"
              r="10"
              cx="160"
              cy="65"
            >
              <animate
                attributeName="cy"
                calcMode="spline"
                dur="2"
                values="65;135;65;"
                keySplines=".5 0 .5 1;.5 0 .5 1"
                repeatCount="indefinite"
                begin="0"
              ></animate>
            </circle>
          </svg>
        </div>
      )}
      <div className="container mx-auto max-w-7xl bg-purple-100 rounded-lg mb-5">
        {dropdown.map((product) => {
          return (
            <div
              className="container mx-auto flex justify-between max-w-7xl px-6 py-2 border-b-2 border-black "
              key={product.slug}
            >
              <span>
                {product.slug} ({product.quantity} Available for {product.price}
                )
              </span>
              <div className="bg-purple-500 text-white p-2 rounded mx-5 flex items-center justify-between">
                <button
                  onClick={() =>
                    Changequantity(product.slug, "minus", product.quantity)
                  }
                  disabled={loadingaction}
                  className="px-3 py-1 mx-4 bg-purple-700 hover:bg-purple-600 text-white font-semibold rounded disabled:bg-purple-200 cursor-pointer"
                >
                  -
                </button>
                <span className="w-9 pl-1">{product.quantity}</span>
                <button
                  onClick={() =>
                    Changequantity(product.slug, "plus", product.quantity)
                  }
                  disabled={loadingaction}
                  className="px-3 py-1 mx-4 bg-purple-700 hover:bg-purple-600 text-white font-semibold rounded disabled:bg-purple-200 cursor-pointer "
                >
                  +
                </button>
              </div>
            </div>
          );
        })}
      </div>
      <Addproduct />
      <div className="container mx-auto flex items-center justify-center border-t-4   max-w-7xl ">
        <div className="bg-gray-100  p-8 rounded-lg shadow-md w-full">
          <div className="flex flex-row mb-1 sm:mb-0 justify-between w-full">
            <h1 className="text-3xl font-bold leading-tight mb-6">
              Stock Table
            </h1>
            <button
              disabled={loadingtable}
              className="bg-gray-600 text-white p-4 rounded-lg shadow-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-600 disabled:bg-gray-200"
              onClick={() => {
                setupdate(update + 1);
                setloadingtable(true);
                // console.log(update);
              }}
            >
              Refresh
            </button>
            {isVisible && (
              <Link
                to="section2"
                smooth={true}
                duration={500}
                className="fixed bottom-8 right-8 bg-purple-500 text-white p-4 rounded-full shadow-lg flex items-center justify-center hover:bg-purple-800 transition duration-300"
              >
                <ChevronDoubleUpIcon className="h-6 w-6 " />
              </Link>
            )}
          </div>
          <div className="py-8 overflow-x-auto ">
            <table className="min-w-full  leading-normal">
              <thead>
                <tr>
                  <th
                    scope="col"
                    className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-semibold"
                  >
                    Product
                  </th>
                  <th
                    scope="col"
                    className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-semibold"
                  >
                    Quantity
                  </th>
                  <th
                    scope="col"
                    className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-semibold"
                  >
                    Price
                  </th>
                </tr>
              </thead>
              <tbody>
                {Product.map((product) => {
                  return (
                    <tr key={product.slug}>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">
                          {product.slug}
                        </p>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">
                          {" "}
                          {product.quantity}
                        </p>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">
                          ₹{product.price}
                        </p>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default Tables;
