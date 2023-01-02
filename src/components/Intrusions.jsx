import React, { useContext, useState, useEffect } from 'react';
import ReadingsContext from '../store/readingsContext';
import { extractDate, extractTime } from '../utils/timeFormat';
import Spinner from './Spinner';

const Intrusions = () => {
  const { intrusions, loading } = useContext(ReadingsContext);
  console.log('intrusions', loading);

  const [intrusionsTransformed, setIntrusionsTransformed] = useState([]);

  useEffect(() => {
    const intrusionsTransformed = intrusions.map((intrusion) => {
      return {
        date: extractDate(intrusion.timestamp),
        time: extractTime(intrusion.timestamp),
        closerToTheDoor: intrusion.distance,
      };
    });
    setIntrusionsTransformed(intrusionsTransformed);
  }, [intrusions]);

  if (loading)
    return (
      <div className='flex min-h-[90vh] w-full items-center justify-center'>
        <Spinner />
      </div>
    );

  return (
    <div className='w-full px-4 py-6 sm:px-6 lg:px-8'>
      <div className='sm:flex sm:items-center'>
        <div className='sm:flex-auto'>
          <h1 className='text-xl font-semibold text-gray-900 lg:text-4xl'>Intrusions Detected</h1>
          <p className='mt-2 text-sm text-gray-700'>
            A list of all the intrusions detected by the system over the period of time.
          </p>
        </div>
      </div>
      <div className='mt-8 flex flex-col'>
        <div className='-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8'>
          <div className='inline-block min-w-full py-2 align-middle md:px-6 lg:px-8'>
            <div className='overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg'>
              <table className='min-w-full divide-y divide-gray-300'>
                <thead className='bg-gray-50'>
                  <tr className='divide-x divide-gray-200'>
                    <th
                      scope='col'
                      className='py-3.5 pl-4 pr-4 text-left text-sm font-semibold text-gray-900 sm:pl-6'
                    >
                      Date
                    </th>
                    <th
                      scope='col'
                      className='px-4 py-3.5 text-left text-sm font-semibold text-gray-900'
                    >
                      Time
                    </th>
                    <th
                      scope='col'
                      className='px-4 py-3.5 text-left text-sm font-semibold text-gray-900'
                    >
                      Closer to the door
                    </th>
                  </tr>
                </thead>
                <tbody className='divide-y divide-gray-200 bg-white'>
                  {intrusionsTransformed.map((intrusion) => (
                    <tr key={intrusion.time} className='divide-x divide-gray-200'>
                      <td className='whitespace-nowrap py-4 pl-4 pr-4 text-sm text-gray-900 sm:pl-6'>
                        {intrusion.date}
                      </td>
                      <td className='whitespace-nowrap p-4 text-sm font-medium text-red-500'>
                        {intrusion.time}
                      </td>
                      <td className='whitespace-nowrap p-4 text-sm font-medium text-gray-500'>
                        {intrusion.closerToTheDoor} {'cm'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Intrusions;
