import React from 'react'
import ReactDOM from 'react-dom/client'

import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import HomeScreen from './screens/HomeScreen.jsx';
import { QueryClient, QueryClientProvider } from 'react-query';



const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeScreen/>
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
