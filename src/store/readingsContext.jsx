import React, { createContext, useState, useEffect, useContext } from 'react';
import { db } from '../config/firebase';
import { onValue, ref } from 'firebase/database';
import { formatUnix } from '../utils/timeFormat';
import ModalContext from './modalContext';

export const ReadingsContext = createContext();

export const ReadingsProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const { openModal } = useContext(ModalContext);

  const THRESHOLD_DISTANCE = parseInt(import.meta.env.VITE_THRESHOLD_DISTANCE);
  const THRESHOLD_TIME = parseInt(import.meta.env.VITE_THRESHOLD_TIME_SECS || 30);

  const [distanceArr, setDistanceArr] = useState({});
  const [timeArr, setTimeArr] = useState({});
  const [intrusions, setIntrusions] = useState([]);
  const [ledControl, setLedControl] = useState(0);
  const [totalIntrusions, setTotalIntrusions] = useState(0);
  const [humidity, setHumidity] = useState({});
  const [temperature, setTemperature] = useState({});

  const turnLEDOFF = () => {
    setLedControl(0);
  };

  const turnLEDON = () => {
    setLedControl(1);
  };

  const getDigitalControl = () => {
    const query = ref(db, 'UsersData/3n3WlmxowFdI5DjHN2jGH3rW4vF3/outputs/digital');
    return onValue(query, (snapshot) => {
      const data = snapshot.val();
      if (snapshot.exists()) {
        // setLedControl(data.led);
        Object.values(data).map((output) => {
          setLedControl(output);
        });
      }
    });
  };

  const getReadings = () => {
    const query = ref(db, 'UsersData/3n3WlmxowFdI5DjHN2jGH3rW4vF3/readings');
    return onValue(query, (snapshot) => {
      const data = snapshot.val();
      const distanceArr = [];
      const timeArr = [];
      const intrusions = [];
      const humidityArr = [];
      const temperatureArr = [];

      if (snapshot.exists()) {
        Object.values(data).map((reading) => {
          distanceArr.push(reading.distance);
          timeArr.push(formatUnix(reading.timestamp));
          if (reading.distance < THRESHOLD_DISTANCE) {
            intrusions.push(reading);
          }
          humidityArr.push(reading.humidity);
          temperatureArr.push(reading.temperature);
        });
      }
      setDistanceArr(() => distanceArr);
      setTimeArr(() => timeArr);
      setIntrusions(() => intrusions);
      setTotalIntrusions(() => intrusions.length);
      setHumidity(() => humidityArr);
      setTemperature(() => temperatureArr);
      setLoading(false);
    });
  };

  useEffect(() => {
    getReadings();
    getDigitalControl();
  }, []);

  useEffect(() => {
    if (intrusions.length === 0) return;
    // get last intrusions and if they are within 30 secs, then send notification
    const lastIntrusion = intrusions[intrusions.length - 1];
    const lastIntrusionTime = lastIntrusion.timestamp;
    const lastIntrusionTimeInSecs = lastIntrusionTime / 1000;
    const currentTime = Date.now();
    const currentTimeInSecs = currentTime / 1000;
    const timeDiff = currentTimeInSecs - lastIntrusionTimeInSecs;

    if (timeDiff < THRESHOLD_TIME) {
      console.log('Intrusion Detected');
      openModal();
    } else {
      console.log('No Intrusion Detected');
    }
  }, [intrusions]);

  return (
    <ReadingsContext.Provider
      value={{
        distanceArr,
        timeArr,
        intrusions,
        turnLEDON,
        turnLEDOFF,
        doorLock: ledControl,
        totalIntrusions,
        humidity,
        temperature,
        loading,
      }}
    >
      {children}
    </ReadingsContext.Provider>
  );
};

export default ReadingsContext;
