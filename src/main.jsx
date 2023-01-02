import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';
import ErrorPage from './partials/ErrorPage';
import DistanceChart from './components/MotionDetection';
import Intrusions from './components/Intrusions';
import './index.css';
import { ModalProvider } from './store/modalContext';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: 'distance',
        element: <DistanceChart />,
      },
      {
        path: 'intrusions',
        element: <Intrusions />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ModalProvider>
      <RouterProvider router={router} />
    </ModalProvider>
  </React.StrictMode>,
);
