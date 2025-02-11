import type { BaseChargeState, ChargeState } from './types';

export const addChargeDirection = (chargeStates: BaseChargeState[]): ChargeState[] =>
  chargeStates.map((state, i, states) => {
    const prevState = states[i - 1];

    if (prevState === undefined) {
      return { ...state, direction: 'up' };
    }

    const direction =
      state.chargingLevel === prevState.chargingLevel
        ? 'same'
        : state.chargingLevel - prevState.chargingLevel > 0
        ? 'up'
        : 'down';

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
