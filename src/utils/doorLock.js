import { getDatabase, ref, set } from 'firebase/database';

export const toggleLock = () => {
  const db = getDatabase();
  const data = enabled ? 0 : 1;
  return set(ref(db, 'UsersData/3n3WlmxowFdI5DjHN2jGH3rW4vF3/outputs/digital/4'), data);
};

export const openDoor = () => {
  const db = getDatabase();
  return set(ref(db, 'UsersData/3n3WlmxowFdI5DjHN2jGH3rW4vF3/outputs/digital/4'), 1);
};

export const closeDoor = () => {
  const db = getDatabase();
  return set(ref(db, 'UsersData/3n3WlmxowFdI5DjHN2jGH3rW4vF3/outputs/digital/4'), 0);
};
