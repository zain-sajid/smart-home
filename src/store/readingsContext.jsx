import React, { createContext, useState, useEffect } from 'react';
import { db } from '../config/firebase';
import { onValue, ref } from 'firebase/database';
import { formatUnix } from '../utils/timeFormat';

export const ReadingsContext = createContext();

export const ReadingsProvider = ({ children }) => {
  const THRESHOLD_DISTANCE = 10;

  const [distanceArr, setDistanceArr] = useState({});
  const [timeArr, setTimeArr] = useState({});
  const [intrusions, setIntrusions] = useState([]);

  const getReadings = () => {
    const query = ref(db, 'UsersData/3n3WlmxowFdI5DjHN2jGH3rW4vF3/readings');
    return onValue(query, (snapshot) => {
      const data = snapshot.val();
      const distanceArr = [];
      const timeArr = [];
      const intrusions = [];

      if (snapshot.exists()) {
        Object.values(data).map((reading) => {
          distanceArr.push(reading.distance);
          timeArr.push(formatUnix(reading.timestamp));
          if (reading.distance < THRESHOLD_DISTANCE) {
            intrusions.push(reading);
          }
        });
      }
      setDistanceArr(() => distanceArr);
      setTimeArr(() => timeArr);
      setIntrusions(() => intrusions);
    });
  };

  useEffect(() => {
    getReadings();
  }, []);

  return (
    <ReadingsContext.Provider value={{ distanceArr, timeArr, intrusions }}>
      {children}
    </ReadingsContext.Provider>
  );
};

export default ReadingsContext;
