import React from "react";
import { useState, useEffect } from "react";
function Addproduct() {
  const [ProductData, setProductData] = useState({});
  const [Alert, setAlert] = useState("");
  const [errors, setErrors] = useState({});

  const handelchange = (e) => {
    setProductData({ ...ProductData, [e.target.name]: e.target.value });
    // console.log(ProductData.slug);
  };

  const validate = () => {
    let errorss = {};
    if (!ProductData.slug) errorss.slug = "Product Slug is required";
    if (!ProductData.quantity) errorss.quantity = "Quantity is required";
    if (!ProductData.price) errorss.price = "Price is required";
    setErrors(errorss);
    // console.log(errorss);
    setAlert(errorss.slug || errorss.quantity || errorss.price);

    return Object.keys(errorss).length === 0;
  };

  const handelsubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      try {
        const response = await fetch("/api/products", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(ProductData),
        });

        if (response.ok) {
          // console.log("Product added successfully.");
          setAlert("Product added successfully.");
          setProductData({});
          // Optionally, you can reset the htmlForm fields here
        } else {
          console.error("Failed to add product.");
          const errorData = await response.json();
          console.error("Error:", errorData);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  return (
    <>
      {Alert && (
        <div className="container mx-auto text-xl text-center text-green-700 py-4">
          {Alert}
        </div>
      )}

      <div className="container mx-auto flex items-center justify-center max-w-7xl">
        <div className="bg-gray-100 p-8 rounded-lg shadow-md w-full ">
          <h1 className="text-3xl font-bold leading-tight mb-6">
            Add a Product
          </h1>

          <form action="#" method="POST" encType="multipart/htmlForm-data">
            <div className="mb-4">
              <label
                htmlFor="product-name"
                className="block text-gray-700 font-bold mb-2"
              >
                Product Slug
              </label>
              <input
                value={ProductData.slug || ""}
                onChange={handelchange}
                type="text"
                id="product-name"
                name="slug"
                className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="description"
                className="block text-gray-700 font-bold mb-2"
              >
                Quantity
              </label>
              <input
                value={ProductData.quantity || ""}
                onChange={handelchange}
                type="number"
                id="description"
                name="quantity"
                rows="4"
                className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="price"
                className="block text-gray-700 font-bold mb-2"
              >
                Price
              </label>
              <input
                value={ProductData.price || ""}
                onChange={handelchange}
                type="number"
                id="price"
                name="price"
                className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>
            <div className="flex items-center justify-between">
              <button
                onClick={handelsubmit}
                type="submit"
                className="bg-purple-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
              >
                Add Product
              </button>
              <button
                type="reset"
                className="bg-gray-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-600"
              >
                Reset
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Addproduct;
