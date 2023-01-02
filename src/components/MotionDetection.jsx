import React, { useContext, useEffect, useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import Spinner from './Spinner';
import ReadingsContext from '../store/readingsContext';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Ultrasonic Sensor Data',
    },
  },
};

const DistanceChart = () => {
  const [loading, setLoading] = useState(true);
  const { distanceArr, timeArr } = useContext(ReadingsContext);
  const [data, setData] = useState({});

  useEffect(() => {
    setData(() => ({
      labels: timeArr,
      datasets: [
        {
          label: 'Distance (cm)',
          data: distanceArr,
          borderColor: 'rgb(255, 99, 132)',
          backgroundColor: 'rgba(255, 99, 132, 0.5)',
        },
      ],
    }));
    setLoading(false);
  }, [distanceArr, timeArr]);

  if (loading || !data)
    return (
      <div className='flex min-h-[90vh] w-full items-center justify-center'>
        <Spinner />
      </div>
    );

  return (
    <div className='min-h-[90vh] w-full flex-1 flex-col items-center justify-center px-4 py-6 sm:px-6 lg:px-8'>
      <div className='sm:flex sm:items-center'>
        <div className='sm:flex-auto'>
          <h1 className='text-xl font-semibold text-gray-900 lg:text-4xl'>Motion Sensor Graph</h1>
          <p className='mt-2 text-sm text-gray-700'>
            A real time graph of the distance measured by the ultrasonic sensor. Distance is
            measured in cm.
          </p>
        </div>
      </div>
      <div className={`h-[100vh] w-[100vw] py-6 pr-4 sm:h-full sm:w-full `}>
        {data && <Line options={options} data={data} />}
      </div>
    </div>
  );
};

export default DistanceChart;
