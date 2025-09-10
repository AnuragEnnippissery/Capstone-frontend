import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {  RouterProvider } from 'react-router-dom'
import { createBrowserRouter } from 'react-router-dom'
import Login from './components/Authentication/Login.jsx'
import Register from './components/Authentication/Register.jsx'
import Home from './components/Home/Home.jsx'
import DisplayPage from './components/Home/DisplayPage.jsx'
import { Provider } from 'react-redux'
import appStore from './utils/appstore.js'
import ChannelPage from './components/Channel/ChannelPage.jsx'
import ChannelCreationForm from './components/Channel/ChannelCreationForm.jsx'

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
      path:'/VideoPlayer/:id',element:<DisplayPage/>,
    },
    {
      path:'/Login',element:<Login/>
    },
    {
      path:'/Register',element:<Register/>
    },
    {
      path:'/Channel',element:<ChannelPage/>
    },
    {
      path:'/Channel/ChannelForm',element:<ChannelCreationForm/>
    }
  ],
  
  },
  
]);


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={appStore}>
        <RouterProvider router={appRouter}/>
    </Provider>
      
    
    
  </StrictMode>,
)
