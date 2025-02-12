import { useMemo, useState } from 'react';

import { Tabs, Table } from '@/components';
import { formatDate, toTitleCase } from '@/utils';

import { Battery } from '../components';
import { useChargingStatesQuery } from '../hooks';
import { getChargingDirection } from '../utils';

import './ChargingStates.css';

const views = ['battery', 'table'] as const;
const tableColumns = ['Date & Time', 'Battery Level', 'Charging Direction'];

type View = (typeof views)[number];

export function ChargingStates() {
  const chargingStatesQuery = useChargingStatesQuery();

  const [activeView, setActiveView] = useState<View>(views[0]);
  const tableData = useMemo(
    () =>
      chargingStatesQuery.data?.map((state, i, states) => [
        formatDate(state.date, { year: 'numeric', month: 'long', second: '2-digit' }),
        `${state.chargingLevel}%`,
        toTitleCase(getChargingDirection(state.chargingLevel, states[i - 1]?.chargingLevel)),
      ]) ?? [],
    [chargingStatesQuery.data]
  );

  return (
    <main>
      <header className="page-header">
        <h1>Sonnen Battery</h1>

        <Tabs items={views} activeItem={activeView} onSelect={setActiveView} />
      </header>

      <article className="page-body">
        {chargingStatesQuery.isPending ? (
          'Loading...'
        ) : chargingStatesQuery.isError ? (
          'Error'
        ) : activeView === 'battery' ? (
          <Battery chargeState={chargingStatesQuery.data} />
        ) : (
          <Table columns={tableColumns} data={tableData} />
        )}
      </article>
    </main>
  );
}
