import type { BaseChargeState, ChargeState } from './types';

export const addChargeDirection = (chargeStates: BaseChargeState[]): ChargeState[] =>
  chargeStates.map((state, i, states) => {
    const prevState = states[i - 1];

    const direction = getChargingDirection(state.chargingLevel, prevState?.chargingLevel);

    return {
      ...state,
      direction,
    };
  });

export const groupByCharge = <T extends BaseChargeState>(chargeStates: T[]) =>
  chargeStates.reduce((acc, state) => {
    if (acc[state.chargingLevel] === undefined) {
      acc[state.chargingLevel] = [state];
    } else {
      acc[state.chargingLevel].push(state);
    }

    return acc;
  }, {} as Record<number, T[]>);

export const getChargeStatus = (level: number) => {
  if (level === 100) return 'full';

  if (level < 20) return 'low';

  if (level < 65) return 'medium';

  return 'high';
};

export const getChargingDirection = (level: number, prevLevel?: number) => {
  if (prevLevel === undefined) return 'up';

  if (level === prevLevel) return 'same';

  return level > prevLevel ? 'up' : 'down';
};
