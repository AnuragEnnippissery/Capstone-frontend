import { StrictMode, lazy, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import appStore from './utils/appStore.js';
import ErrorPage from './utils/ErrorPage.jsx';
import ProtectedRoute from './components/Authentication/ProtectedRoute.jsx';

// Lazy load components
const Home = lazy(() => import('./components/Home/Home.jsx'));
const DisplayPage = lazy(() => import('./components/Home/DisplayPage.jsx'));
const Login = lazy(() => import('./components/Authentication/Login.jsx'));
const Register = lazy(() => import('./components/Authentication/Register.jsx'));
const ChannelPage = lazy(() => import('./components/Channel/ChannelPage.jsx'));
const ChannelCreationForm = lazy(() => import('./components/Channel/ChannelCreationForm.jsx'));
const VideoCreationForm = lazy(() => import('./components/Channel/VideoCreationForm.jsx'));
const EditVideoForm = lazy(() => import('./components/Channel/EditVideoForm.jsx'));
const ChannelEditForm = lazy(() => import('./components/Channel/ChannelEditForm.jsx'));

// Router
const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      // Public routes
      { path: '/Login', element: <Suspense fallback={<div>Loading...</div>}><Login /></Suspense> },
      { path: '/Register', element: <Suspense fallback={<div>Loading...</div>}><Register /></Suspense> },

      // Protected routes
      {
        path: '/',
        element: (
          <ProtectedRoute>
            <Suspense fallback={<div>Loading...</div>}><Home /></Suspense>
          </ProtectedRoute>
        ),
      },
      {
        path: '/VideoPlayer/:id',
        element: (
          <ProtectedRoute>
            <Suspense fallback={<div>Loading...</div>}><DisplayPage /></Suspense>
          </ProtectedRoute>
        ),
      },
      {
        path: '/Channel',
        element: (
          <ProtectedRoute>
            <Suspense fallback={<div>Loading...</div>}><ChannelPage /></Suspense>
          </ProtectedRoute>
        ),
      },
      {
        path: '/Channel/ChannelForm',
        element: (
          <ProtectedRoute>
            <Suspense fallback={<div>Loading...</div>}><ChannelCreationForm /></Suspense>
          </ProtectedRoute>
        ),
      },
      {
        path: '/Channel/VideoForm',
        element: (
          <ProtectedRoute>
            <Suspense fallback={<div>Loading...</div>}><VideoCreationForm /></Suspense>
          </ProtectedRoute>
        ),
      },
      {
        path: '/Channel/EditVideoForm/:id',
        element: (
          <ProtectedRoute>
            <Suspense fallback={<div>Loading...</div>}><EditVideoForm /></Suspense>
          </ProtectedRoute>
        ),
      },
      {
        path: '/Channel/EditChannelForm/:id',
        element: (
          <ProtectedRoute>
            <Suspense fallback={<div>Loading...</div>}><ChannelEditForm /></Suspense>
          </ProtectedRoute>
        ),
      },
    ],
  },
]);

// Render
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={appStore}>
      <RouterProvider router={appRouter}/>
      <ToastContainer />
    </Provider>
  </StrictMode>
);
