import React from 'react'
import ReactDOM from 'react-dom/client'

import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import HomeScreen from './screens/HomeScreen.jsx';
import { QueryClient, QueryClientProvider } from 'react-query';
import BlogsPage from './screens/Blogs.jsx';
import BlogDetailsPage from './screens/BlogDetailsPage.jsx';
import AdminHome from './screens/AdminHome.jsx';
import LoginPage from './screens/LoginPage.jsx';
import RegisterPage from './screens/RegisterPage.jsx';
import CreateBlogScreen from './screens/CreateBlogPage.jsx';
import UserEditBlogScreen from './screens/EditBlog.jsx';
import AdminBlogListScreen from './screens/AdminBlogListScreen.jsx';



const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeScreen/>
  },

  {
    path: "/login",
    element: <LoginPage/>
  },

  {
    path: "/register",
    element: <RegisterPage/>
  },



  {
    path: "/news",
    element: <BlogsPage/>
  },

  {
    path: "/admin",
    element: <AdminHome/>
  },

  {
    path: "/admin/blogs",
    element: <AdminBlogListScreen/>
  },

  {
    path: "/createblog",
    element:<CreateBlogScreen/>
  },

  {
    path: "/blog/:slug",
    element: <BlogDetailsPage/>
  },

  {
    path: "/admin/blog/:slug",
    element: <UserEditBlogScreen/>
  },

]);

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
     
  </React.StrictMode>,
)
