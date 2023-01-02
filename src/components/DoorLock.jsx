import React from 'react';
import Spinner from './Spinner';
import { ReadingsContext } from '../store/readingsContext';
import LockSwitch from './LockSwitch';

const DoorLock = () => {
  const [loading, setLoading] = React.useState(true);
  const { doorLock } = React.useContext(ReadingsContext);

  const getDoorLockStatus = () => {
    if (doorLock === 1) {
      return 'Unlocked';
    } else {
      return 'Locked';
    }
  };

  React.useEffect(() => {
    setLoading(false);
  }, []);

  if (loading)
    return (
      <div className='flex min-h-[90vh] w-full items-center justify-center'>
        <Spinner />
      </div>
    );

  return (
    <div className='h-full w-full px-4 py-6 sm:px-6 lg:px-8'>
      <div className='sm:flex sm:items-center'>
        <div className='sm:flex-auto'>
          <h1 className='text-xl font-semibold text-gray-900 lg:text-4xl'>Door Lock</h1>
          <p className='mt-2 text-sm text-gray-700'>
            Control the door lock and see the status of the door lock.
          </p>
        </div>
      </div>

      {/* HERE */}

      <div className='my-32 flex h-full flex-col items-center justify-center gap-12'>
        <p className='text-2xl'>
          The Door is currently:{' '}
          <span
            className={` font-medium transition-colors ${
              doorLock === 0 ? 'text-red-500' : 'text-green-500'
            }`}
          >
            {getDoorLockStatus()}
          </span>
        </p>

        <div className='scale-[200%]'>
          <LockSwitch enabled={doorLock === 1} />
        </div>

        {/* <div className='my-12 flex h-full items-center justify-center '>
          <label className='relative inline-flex cursor-pointer items-center'>
            <input type='checkbox' className='peer sr-only' />
            <div className="peer h-12 w-24 rounded-full bg-red-500 after:absolute after:top-[2px] after:left-[4px] after:h-11 after:w-11 after:rounded-full after:border after:border-red-500 after:bg-white after:transition-all after:content-[''] peer-checked:bg-green-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 dark:border-red-600 dark:bg-red-700 dark:peer-focus:ring-green-800"></div>
            <span className='ml-3 text-2xl font-medium text-gray-900 dark:text-gray-300'>
              {getLockToggleStatus()}
            </span>
          </label>
        </div> */}
      </div>
    </div>
  );
};

export default DoorLock;
