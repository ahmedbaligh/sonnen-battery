import { Battery } from '@features/battery/components';
import battery from '@features/battery/data.json';

import './App.css';

export function App() {
  return (
    <main>
      <Battery chargeState={battery.chargingStates} />
    </main>
  );
}
