import { useMemo } from 'react';

import { cn, formatDate } from '../../../../utils';

import { addChargeDirection, getChargeStatus, groupByCharge } from '../../utils';
import type { BaseChargeState } from '../../types.ts';

import './Battery.css';

interface BatteryProps {
  chargeState: BaseChargeState[];
}

export function Battery({ chargeState }: BatteryProps) {
  const groupedByCharge = useMemo(() => groupByCharge(addChargeDirection(chargeState)), [chargeState]);

  const lastChargeLevel = chargeState[chargeState.length - 1].chargingLevel;

  return (
    <div className={cn('battery', getChargeStatus(lastChargeLevel))}>
      {Array.from({ length: 100 }).map((_, i) => {
        const chargeStates = groupedByCharge[i + 1];

        return (
          <div
            key={i}
            className={cn('charge', {
              'has-data': !!chargeStates,
              current: chargeStates?.[0].chargingLevel === lastChargeLevel,
            })}
          >
            {chargeStates && (
              <article className="charge-states">
                <header>
                  Charge level <strong>{chargeStates[0].chargingLevel}%</strong> at:
                </header>

                <ul className="charge-info">
                  {chargeStates.map(state => (
                    <li key={state.internalEventId}>
                      {formatDate(state.date)}{' '}
                      {state.direction === 'same' ? (
                        <span className="charge-direction same">-</span>
                      ) : state.direction === 'up' ? (
                        <span className="charge-direction up">&#8593;</span>
                      ) : (
                        <span className="charge-direction down">&#8595;</span>
                      )}
                    </li>
                  ))}
                </ul>
              </article>
            )}
          </div>
        );
      })}
    </div>
  );
}
