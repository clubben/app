import {
  getCurrentPositionAsync,
  LocationObject,
  requestForegroundPermissionsAsync,
} from 'expo-location';
import { useEffect, useState } from 'react';
import { globalMMKV } from 'src/data/local/client';

const LOCTION_KEY = 'location';
export function useLocation() {
  const [location, setLocation] = useState<LocationObject | undefined>(() => {
    const storedLocation = globalMMKV.getString(LOCTION_KEY);
    return storedLocation ? JSON.parse(storedLocation) : undefined;
  });

  useEffect(() => {
    (async () => {
      const { status } = await requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        return;
      }

      const loc = await getCurrentPositionAsync();
      setLocation(loc);
      globalMMKV.set(LOCTION_KEY, JSON.stringify(loc));
    })();
  }, []);

  return { location };
}
