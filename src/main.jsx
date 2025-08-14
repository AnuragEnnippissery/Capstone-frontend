import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {  RouterProvider } from 'react-router-dom'
import { createBrowserRouter } from 'react-router-dom'
import Login from './components/Authentication/Login.jsx'
import Register from './components/Authentication/Register.jsx'
import Home from './components/Home/Home.jsx'

const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    //errorElement:<NotFound/>,
    children:[{
      path:'/',element:<Home/>
    },
    {
      // path: '/Cart',element: (
      //     <Suspense fallback={<div>Loading Cart...</div>}>
      //       <Cart />
      //     </Suspense>
      //   ),
    },
    
    
    {
      //path:'/ProductList/:id',element:<ProductDetail/>,
    },
    {
      path:'/Login',element:<Login/>
    },
    {
      path:'/Register',element:<Register/>
    }
  ],
  
  },
  
]);


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={appRouter}/>
      
    
    
  </StrictMode>,
)
