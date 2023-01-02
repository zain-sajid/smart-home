import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';
import './index.css';
import { ModalProvider } from './store/modalContext';
import { ReadingsProvider } from './store/readingsContext';
import ErrorPage from './components/ErrorPage';
import DistanceChart from './components/MotionDetection';
import Intrusions from './components/Intrusions';
import DoorLock from './components/DoorLock';
import HumiditySensor from './components/HumiditySensor';
import TemperatureSensor from './components/TemperatureSensor';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: 'door',
        element: <DoorLock />,
      },
      {
        path: 'distance',
        element: <DistanceChart />,
      },
      {
        path: 'intrusions',
        element: <Intrusions />,
      },
      {
        path: 'humidity',
        element: <HumiditySensor />,
      },
      {
        path: 'temperature',
        element: <TemperatureSensor />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ModalProvider>
      <ReadingsProvider>
        <RouterProvider router={router} />
      </ReadingsProvider>
    </ModalProvider>
  </React.StrictMode>,
);
