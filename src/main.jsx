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



const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeScreen/>
  },

  {
    path: "/news",
    element: <BlogsPage/>
  },

  {
    path: "/blog/:id",
    element: <BlogDetailsPage/>
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
