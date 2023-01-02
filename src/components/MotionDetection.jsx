import React, { useEffect, useState } from 'react';
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
import { mobileQuery } from '../utils/mobileQuery';

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
  const [data, setData] = useState({});
  const isMobile = mobileQuery();

  const getReadings = () => {
    const query = ref(db, 'UsersData/3n3WlmxowFdI5DjHN2jGH3rW4vF3/readings');
    return onValue(query, (snapshot) => {
      const data = snapshot.val();
      const distanceArr = [];
      const timeArr = [];

      if (snapshot.exists()) {
        Object.values(data).map((reading) => {
          distanceArr.push(reading.distance);
          timeArr.push(formatUnix(reading.timestamp));
        });
      }
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
    });
  };

  useEffect(() => {
    setLoading(true);

    getReadings();
  }, []);

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
