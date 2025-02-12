import { useQuery } from '@tanstack/react-query';

import { sleep } from '@/utils';

import battery from '../data.json';

const queryKey = ['battery-charge-states'];

const queryFn = async () => {
  await sleep(1000);

  return battery.chargingStates;
};

export const useChargingStatesQuery = () =>
  useQuery({
    queryKey,
    queryFn,
  });

useChargingStatesQuery.queryKey = queryKey;
useChargingStatesQuery.queryFn = queryFn;
