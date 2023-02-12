import React from 'react';
import Layout from './hoc/Layout/Layout';
import BurguerBuilder from './containers/BurguerBuilder/BurguerBuilder';
import CheckOut from './containers/CheckOut/CheckOut';
import { Route, createBrowserRouter, createRoutesFromElements, Navigate, RouterProvider } from 'react-router-dom';


const app = (props) => {

    const router= createBrowserRouter(createRoutesFromElements(
      <Route path='/' element={<Layout/>}>
        <Route index element={<Navigate to='/burger' replace/>} />
        <Route path='burger' element={<BurguerBuilder/>}/>
        <Route path='checkout' element={<CheckOut/>} />
        <Route path='*' element={<h1>Not Found</h1>} />
      </Route>
    ));

    return (
      <div >
        <RouterProvider router={router}/>
      </div>
    );
  }

export default app;
