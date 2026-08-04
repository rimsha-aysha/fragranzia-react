import React, { useEffect, useState } from "react";
import "./Customers.css";
import axios from "axios";

import { FaUsers, FaSearch, FaEye } from "react-icons/fa";

const Customer = () => {
  const [customers, setCustomers] = useState([]);
  const [filteredCustomers, setFilteredCustomers] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    getCustomers();
  }, []);

  useEffect(() => {
    const filtered = customers.filter((customer) =>
      customer.name.toLowerCase().includes(search.toLowerCase()) ||
      customer.email.toLowerCase().includes(search.toLowerCase()) ||
      customer.phone.includes(search)
    );

    setFilteredCustomers(filtered);
  }, [search, customers]);

  const getCustomers = async () => {
    try {
      const usersRes = await axios.get(
        "http://localhost:5000/api/signUp"
      );

      const ordersRes = await axios.get(
        "http://localhost:5000/api/orders"
      );

      const users = usersRes.data;

      const updatedUsers = users.map((user) => {
        const totalOrders = ordersRes.data.filter(
          (order) => order.user._id === user._id
        ).length;

        return {
          ...user,
          totalOrders,
        };
      });

      setCustomers(updatedUsers);
      setFilteredCustomers(updatedUsers);

    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="customer-body">

      <div className="customer-top">

        <div className="customer-title">
          <FaUsers />
          <h2>Customers</h2>
        </div>

        <div className="search-box">
          <FaSearch />

          <input
            type="text"
            placeholder="Search customer..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

      </div>

      <div className="customer-table">

        <table>

          <thead>

            <tr>
              <th>Name</th>
              <th>Phone</th>
              <th>Email</th>
              <th>Orders</th>
              <th>Joined</th>
              <th>Action</th>
            </tr>

          </thead>

          <tbody>

            {filteredCustomers.map((customer) => (

              <tr key={customer._id}>

                <td>{customer.name}</td>

                <td>{customer.phone}</td>

                <td>{customer.email}</td>

                <td>{customer.totalOrders}</td>

                <td>
                  {new Date(
                    customer.createdAt
                  ).toLocaleDateString()}
                </td>

                <td>

                  <button
                    className="view-btn"
                    onClick={() =>
                      setSelectedCustomer(customer)
                    }
                  >
                    <FaEye />
                    View
                  </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>
            {selectedCustomer && (
        <div
          className="customer-popup"
          onClick={() => setSelectedCustomer(null)}
        >
          <div
            className="customer-popup-box"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="popup-header">
              <h3>Customer Details</h3>
            </div>

            <div className="customer-details">

              <div className="detail-item">
                <label>Name</label>
                <p>{selectedCustomer.name}</p>
              </div>

              <div className="detail-item">
                <label>Email</label>
                <p>{selectedCustomer.email}</p>
              </div>

              <div className="detail-item">
                <label>Phone</label>
                <p>{selectedCustomer.phone}</p>
              </div>

              <div className="detail-item">
                <label>Total Orders</label>
                <p>{selectedCustomer.totalOrders}</p>
              </div>

              <div className="detail-item">
                <label>Joined On</label>
                <p>
                  {new Date(
                    selectedCustomer.createdAt
                  ).toLocaleDateString()}
                </p>
              </div>

              <div className="detail-item">
                <label>User ID</label>
                <p>{selectedCustomer._id}</p>
              </div>

            </div>

            <div className="popup-footer">
              <button
                className="close-btn"
                onClick={() => setSelectedCustomer(null)}
              >
                Close
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};

export default Customer;