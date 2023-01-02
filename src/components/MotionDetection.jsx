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
import { db } from '../config/firebase';
import { onValue, ref } from 'firebase/database';
import Spinner from './Spinner';
import { formatUnix } from '../utils/timeFormat';
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
    setData({
      labels: timeArr,
      datasets: [
        {
          label: 'Distance (cm)',
          data: distanceArr,
          borderColor: 'rgb(255, 99, 132)',
          backgroundColor: 'rgba(255, 99, 132, 0.5)',
        },
      ],
    });
    setLoading(false);
  }, [distanceArr, timeArr]);

  if (loading)
    return (
      <div className='flex min-h-[90vh] w-full items-center justify-center'>
        <Spinner />
      </div>
    );

  return (
    <div className='min-h-[90vh] w-full flex-1 flex-col items-center justify-center'>
      <h1 className='w-full text-center text-4xl'>Motion Detection Readings</h1>

      <div className={`h-[100vh] w-[100vw] py-6 pr-4 sm:h-full sm:w-full `}>
        <Line options={options} data={data} />
      </div>
    </div>
  );
};

export default DistanceChart;
