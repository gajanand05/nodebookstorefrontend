import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import DashboardLayout from "./Dashboard";
import ProductList from "./ProductList";
import AddProduct from "./AddProduct";
import Pages from "./Pages";
import EditBook from "./EditBook";
import Dashboard from "./Index";
import ContactList from './ContactList';
import UserList from './UserList';

// import Pages from "./Pages";
// import Users from "./Users";
// import Orders from "./Orders";

const AdminApp = () => { 
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<Dashboard/>} />
          <Route path="products" element={<ProductList />} />
          <Route path="addproduct" element={<AddProduct />} />
          <Route path="/dashboard/edit/:id" element={<EditBook />} />
          <Route path="pages" element={<Pages />} />
          <Route path="contacts" element={<ContactList />} />
          <Route path="users" element={<UserList />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AdminApp;