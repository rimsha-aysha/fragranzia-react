import React from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

const UserService = () => {
  const axiosPrivate = useAxiosPrivate();

  // Products

  const getProduct = async () => {
    const response = await axiosPrivate.get("/api/product");
    return response.data;
  };

  const postProduct = async (data) => {
    const response = await axiosPrivate.post("/api/product", data);
    return response.data;
  };

  const putProduct = async (productId, data) => {
    const response = await axiosPrivate.put(
      `/api/product/${productId}`,
      data
    );
    return response.data;
  };

  const deleteProduct = async (productId) => {
    const response = await axiosPrivate.delete(
      `/api/product/${productId}`
    );
    return response.data;
  };

  // Categories

  const getCategory = async () => {
    const response = await axiosPrivate.get("/api/category");
    return response.data;
  };

  const deleteCategory = async (id) => {
    const response = await axiosPrivate.delete(
      `/api/category/${id}`
    );
    return response.data;
  };

  return {
    getProduct,
    postProduct,
    putProduct,
    deleteProduct,
    getCategory,
    deleteCategory,
  };
};

export default UserService;