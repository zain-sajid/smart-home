import React, { useEffect, useState } from 'react';
import { db } from '../config/firebase';
import { onValue, ref } from 'firebase/database';
import Spinner from './Spinner';

const Test = () => {
  const [readings, setReadings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    const query = ref(db, 'UsersData/3n3WlmxowFdI5DjHN2jGH3rW4vF3/readings');
    return onValue(query, (snapshot) => {
      const data = snapshot.val();

      if (snapshot.exists()) {
        Object.values(data).map((reading) => {
          setReadings((readings) => [...readings, reading]);
        });
      }
      setLoading(false);
    });
  }, []);

  if (loading)
    return (
      <div className='flex min-h-[90vh] w-full items-center justify-center'>
        <Spinner />
      </div>
    );

  return (
    <div className='min-h-[90vh] w-full flex-1 flex-col items-center justify-center'>
      <h1 className='w-full text-left text-4xl'>Readings</h1>

      <div className='w-full '>
        {readings.map((reading) => (
          <div key={reading.timestamp}>
            <p>{reading.distance}</p>
            <p>{reading.timestamp}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Test;
