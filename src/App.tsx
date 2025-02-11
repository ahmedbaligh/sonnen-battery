import battery from '@features/battery/data.json';

import './App.css';
import { Table } from './components';
import { useMemo } from 'react';
import { formatDate, toTitleCase } from './utils';
import { getChargingDirection } from './features/battery/utils';

const tableColumns = ['Date & Time', 'Battery Level', 'Charging Direction'];

export function App() {
  const tableData = useMemo(
    () =>
      battery.chargingStates.map((state, i, states) => [
        formatDate(state.date, { year: 'numeric', month: 'long', second: '2-digit' }),
        `${state.chargingLevel}%`,
        toTitleCase(getChargingDirection(state.chargingLevel, states[i - 1]?.chargingLevel)),
      ]),
    []
  );

  return (
    <main>
      <Table columns={tableColumns} data={tableData} />
    </main>
  );
}
